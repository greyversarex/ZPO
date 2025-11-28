import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAdmin } from "@/lib/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { 
  ArrowLeft, Plus, Edit, Trash2, Newspaper, Eye, EyeOff, Upload, Calendar
} from "lucide-react";
import type { News } from "@shared/schema";
import { format } from "date-fns";

export default function AdminNews() {
  const [, setLocation] = useLocation();
  const { admin, token, isLoading: authLoading } = useAdmin();
  const { toast } = useToast();
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    titleTj: "",
    titleRu: "",
    titleEn: "",
    contentTj: "",
    contentRu: "",
    contentEn: "",
    excerptTj: "",
    excerptRu: "",
    excerptEn: "",
    imageUrl: "",
    isActive: true,
    publishedAt: new Date().toISOString().split("T")[0]
  });

  const { data: news = [], isLoading } = useQuery<News[]>({
    queryKey: ["/api/news?includeInactive=true"],
    enabled: !!token
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          publishedAt: new Date(data.publishedAt)
        })
      });
      if (!res.ok) throw new Error("Failed to create news");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news?includeInactive=true"] });
      toast({ title: "Муваффақият", description: "Хабар илова шуд" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Хатогӣ", description: "Хабар илова нашуд", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof formData> }) => {
      const res = await fetch(`/api/news/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined
        })
      });
      if (!res.ok) throw new Error("Failed to update news");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news?includeInactive=true"] });
      toast({ title: "Муваффақият", description: "Хабар навсозӣ шуд" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Хатогӣ", description: "Хабар навсозӣ нашуд", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete news");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news?includeInactive=true"] });
      toast({ title: "Муваффақият", description: "Хабар нест шуд" });
    },
    onError: () => {
      toast({ title: "Хатогӣ", description: "Хабар нест нашуд", variant: "destructive" });
    }
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-pulse text-muted-foreground">Боргирӣ...</div>
      </div>
    );
  }

  if (!admin) {
    setLocation("/admin/login");
    return null;
  }

  const resetForm = () => {
    setFormData({
      titleTj: "",
      titleRu: "",
      titleEn: "",
      contentTj: "",
      contentRu: "",
      contentEn: "",
      excerptTj: "",
      excerptRu: "",
      excerptEn: "",
      imageUrl: "",
      isActive: true,
      publishedAt: new Date().toISOString().split("T")[0]
    });
    setEditingNews(null);
  };

  const handleEdit = (item: News) => {
    setEditingNews(item);
    setFormData({
      titleTj: item.titleTj,
      titleRu: item.titleRu || "",
      titleEn: item.titleEn || "",
      contentTj: item.contentTj,
      contentRu: item.contentRu || "",
      contentEn: item.contentEn || "",
      excerptTj: item.excerptTj || "",
      excerptRu: item.excerptRu || "",
      excerptEn: item.excerptEn || "",
      imageUrl: item.imageUrl || "",
      isActive: item.isActive,
      publishedAt: new Date(item.publishedAt).toISOString().split("T")[0]
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      updateMutation.mutate({ id: editingNews.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload
      });
      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, imageUrl: data.imageUrl }));
        toast({ title: "Муваффақият", description: "Расм боргузорӣ шуд" });
      }
    } catch (error) {
      toast({ title: "Хатогӣ", description: "Расм боргузорӣ нашуд", variant: "destructive" });
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Идоракунии хабарҳо</h1>
                <p className="text-sm text-muted-foreground">Хабарҳо ва эълонҳо</p>
              </div>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { 
            setIsDialogOpen(open); 
            if (!open) resetForm(); 
          }}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-news">
                <Plus className="w-4 h-4 mr-2" />
                Илова кардан
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingNews ? "Таҳрири хабар" : "Хабари нав"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Сарлавҳа (TJ) *</Label>
                    <Input
                      value={formData.titleTj}
                      onChange={(e) => setFormData(prev => ({ ...prev, titleTj: e.target.value }))}
                      required
                      data-testid="input-news-title-tj"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Сарлавҳа (RU)</Label>
                    <Input
                      value={formData.titleRu}
                      onChange={(e) => setFormData(prev => ({ ...prev, titleRu: e.target.value }))}
                      data-testid="input-news-title-ru"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Сарлавҳа (EN)</Label>
                    <Input
                      value={formData.titleEn}
                      onChange={(e) => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                      data-testid="input-news-title-en"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Мундариҷа (TJ) *</Label>
                    <Textarea
                      value={formData.contentTj}
                      onChange={(e) => setFormData(prev => ({ ...prev, contentTj: e.target.value }))}
                      rows={4}
                      required
                      data-testid="input-news-content-tj"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Мундариҷа (RU)</Label>
                    <Textarea
                      value={formData.contentRu}
                      onChange={(e) => setFormData(prev => ({ ...prev, contentRu: e.target.value }))}
                      rows={4}
                      data-testid="input-news-content-ru"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Мундариҷа (EN)</Label>
                    <Textarea
                      value={formData.contentEn}
                      onChange={(e) => setFormData(prev => ({ ...prev, contentEn: e.target.value }))}
                      rows={4}
                      data-testid="input-news-content-en"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Аннотатсия (TJ)</Label>
                    <Textarea
                      value={formData.excerptTj}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerptTj: e.target.value }))}
                      rows={2}
                      placeholder="Мухтасари хабар"
                      data-testid="input-news-excerpt-tj"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Аннотатсия (RU)</Label>
                    <Textarea
                      value={formData.excerptRu}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerptRu: e.target.value }))}
                      rows={2}
                      data-testid="input-news-excerpt-ru"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Аннотатсия (EN)</Label>
                    <Textarea
                      value={formData.excerptEn}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerptEn: e.target.value }))}
                      rows={2}
                      data-testid="input-news-excerpt-en"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Расм</Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.imageUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="URL ё боргузорӣ кунед"
                      data-testid="input-news-image"
                    />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        data-testid="input-news-image-upload"
                      />
                      <Button type="button" variant="outline" disabled={uploading} asChild>
                        <span>
                          <Upload className="w-4 h-4" />
                        </span>
                      </Button>
                    </label>
                  </div>
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="Preview" className="mt-2 h-24 object-cover rounded" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Санаи нашр</Label>
                    <Input
                      type="date"
                      value={formData.publishedAt}
                      onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                      data-testid="input-news-date"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-8">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                      data-testid="switch-news-active"
                    />
                    <Label>Фаъол</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Бекор кардан
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-save-news"
                  >
                    {createMutation.isPending || updateMutation.isPending ? "Сабт..." : "Сабт кардан"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Боргирӣ...</div>
        ) : news.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Ҳоло хабар нест</h3>
              <p className="text-muted-foreground mb-4">
                Хабари аввалинро илова кунед
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden" data-testid={`news-card-${item.id}`}>
                <div className="aspect-video bg-muted relative">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.titleTj}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Newspaper className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    {item.isActive ? (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Фаъол
                      </span>
                    ) : (
                      <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                        Ғайрифаъол
                      </span>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(item.publishedAt), "dd.MM.yyyy")}
                  </div>
                  <h3 className="font-semibold mb-1 line-clamp-2">{item.titleTj}</h3>
                  {(item.excerptTj || item.contentTj) && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {item.excerptTj || item.contentTj.substring(0, 100)}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(item)}
                      data-testid={`button-edit-news-${item.id}`}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Таҳрир
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        if (confirm("Оё мутмаин ҳастед?")) {
                          deleteMutation.mutate(item.id);
                        }
                      }}
                      data-testid={`button-delete-news-${item.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
