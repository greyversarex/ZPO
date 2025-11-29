import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import Cropper from "react-easy-crop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAdmin } from "@/lib/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { 
  ArrowLeft, Plus, Edit, Trash2, Image, Upload, ZoomIn, ZoomOut, RotateCcw
} from "lucide-react";
import type { Banner } from "@shared/schema";

export default function AdminBanners() {
  const [, setLocation] = useLocation();
  const { admin, token, isLoading: authLoading } = useAdmin();
  const { toast } = useToast();
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [formData, setFormData] = useState({
    titleTj: "",
    titleRu: "",
    titleEn: "",
    subtitleTj: "",
    subtitleRu: "",
    subtitleEn: "",
    buttonTextTj: "",
    buttonTextRu: "",
    buttonTextEn: "",
    buttonLink: "",
    imageUrl: "",
    cropX: 0,
    cropY: 0,
    cropZoom: 1,
    sortOrder: 0,
    isActive: true
  });

  const { data: banners = [], isLoading } = useQuery<Banner[]>({
    queryKey: ["/api/banners?includeInactive=true"],
    enabled: !!token
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/banners", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to create banner");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners?includeInactive=true"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      toast({ title: "Муваффақият", description: "Баннер илова шуд" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Хатогӣ", description: "Баннер илова нашуд", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof formData> }) => {
      const res = await fetch(`/api/banners/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to update banner");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners?includeInactive=true"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      toast({ title: "Муваффақият", description: "Баннер навсозӣ шуд" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Хатогӣ", description: "Баннер навсозӣ нашуд", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/banners/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete banner");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners?includeInactive=true"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      toast({ title: "Муваффақият", description: "Баннер нест шуд" });
    },
    onError: () => {
      toast({ title: "Хатогӣ", description: "Баннер нест нашуд", variant: "destructive" });
    }
  });

  useEffect(() => {
    if (!authLoading && !admin) {
      setLocation("/admin/login");
    }
  }, [authLoading, admin, setLocation]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-pulse text-muted-foreground">Боргирӣ...</div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  const resetForm = () => {
    setFormData({
      titleTj: "",
      titleRu: "",
      titleEn: "",
      subtitleTj: "",
      subtitleRu: "",
      subtitleEn: "",
      buttonTextTj: "",
      buttonTextRu: "",
      buttonTextEn: "",
      buttonLink: "",
      imageUrl: "",
      cropX: 0,
      cropY: 0,
      cropZoom: 1,
      sortOrder: 0,
      isActive: true
    });
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setEditingBanner(null);
    setShowCropper(false);
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    const cropX = banner.cropX ?? 0;
    const cropY = banner.cropY ?? 0;
    const cropZoom = banner.cropZoom ?? 1;
    setFormData({
      titleTj: banner.titleTj,
      titleRu: banner.titleRu || "",
      titleEn: banner.titleEn || "",
      subtitleTj: banner.subtitleTj || "",
      subtitleRu: banner.subtitleRu || "",
      subtitleEn: banner.subtitleEn || "",
      buttonTextTj: banner.buttonTextTj || "",
      buttonTextRu: banner.buttonTextRu || "",
      buttonTextEn: banner.buttonTextEn || "",
      buttonLink: banner.buttonLink || "",
      imageUrl: banner.imageUrl || "",
      cropX,
      cropY,
      cropZoom,
      sortOrder: banner.sortOrder,
      isActive: banner.isActive
    });
    setCrop({ x: cropX, y: cropY });
    setZoom(cropZoom);
    setShowCropper(!!banner.imageUrl);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      cropX: crop.x,
      cropY: crop.y,
      cropZoom: zoom
    };
    if (editingBanner) {
      updateMutation.mutate({ id: editingBanner.id, data: dataToSave });
    } else {
      createMutation.mutate(dataToSave);
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
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setShowCropper(true);
        toast({ title: "Муваффақият", description: "Расм боргузорӣ шуд" });
      }
    } catch (error) {
      toast({ title: "Хатогӣ", description: "Расм боргузорӣ нашуд", variant: "destructive" });
    }
    setUploading(false);
  };

  const handleResetCrop = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Идоракунии баннерҳо</h1>
                <p className="text-sm text-muted-foreground">Слайдер дар саҳифаи асосӣ</p>
              </div>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { 
            setIsDialogOpen(open); 
            if (!open) resetForm(); 
          }}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-banner">
                <Plus className="w-4 h-4 mr-2" />
                Илова кардан
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingBanner ? "Таҳрири баннер" : "Баннери нав"}
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
                      data-testid="input-banner-title-tj"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Сарлавҳа (RU)</Label>
                    <Input
                      value={formData.titleRu}
                      onChange={(e) => setFormData(prev => ({ ...prev, titleRu: e.target.value }))}
                      data-testid="input-banner-title-ru"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Сарлавҳа (EN)</Label>
                    <Input
                      value={formData.titleEn}
                      onChange={(e) => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                      data-testid="input-banner-title-en"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Зерсарлавҳа (TJ)</Label>
                    <Textarea
                      value={formData.subtitleTj}
                      onChange={(e) => setFormData(prev => ({ ...prev, subtitleTj: e.target.value }))}
                      rows={2}
                      data-testid="input-banner-subtitle-tj"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Зерсарлавҳа (RU)</Label>
                    <Textarea
                      value={formData.subtitleRu}
                      onChange={(e) => setFormData(prev => ({ ...prev, subtitleRu: e.target.value }))}
                      rows={2}
                      data-testid="input-banner-subtitle-ru"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Зерсарлавҳа (EN)</Label>
                    <Textarea
                      value={formData.subtitleEn}
                      onChange={(e) => setFormData(prev => ({ ...prev, subtitleEn: e.target.value }))}
                      rows={2}
                      data-testid="input-banner-subtitle-en"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Матни тугма (TJ)</Label>
                    <Input
                      value={formData.buttonTextTj}
                      onChange={(e) => setFormData(prev => ({ ...prev, buttonTextTj: e.target.value }))}
                      data-testid="input-banner-button-tj"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Матни тугма (RU)</Label>
                    <Input
                      value={formData.buttonTextRu}
                      onChange={(e) => setFormData(prev => ({ ...prev, buttonTextRu: e.target.value }))}
                      data-testid="input-banner-button-ru"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Матни тугма (EN)</Label>
                    <Input
                      value={formData.buttonTextEn}
                      onChange={(e) => setFormData(prev => ({ ...prev, buttonTextEn: e.target.value }))}
                      data-testid="input-banner-button-en"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Истиноди тугма</Label>
                  <Input
                    value={formData.buttonLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, buttonLink: e.target.value }))}
                    placeholder="/contacts"
                    data-testid="input-banner-link"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Расм</Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.imageUrl}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, imageUrl: e.target.value }));
                        if (e.target.value) {
                          setShowCropper(true);
                          setCrop({ x: 0, y: 0 });
                          setZoom(1);
                        } else {
                          setShowCropper(false);
                        }
                      }}
                      placeholder="URL ё боргузорӣ кунед"
                      data-testid="input-banner-image"
                    />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        data-testid="input-banner-image-upload"
                      />
                      <Button type="button" variant="outline" disabled={uploading} asChild>
                        <span>
                          <Upload className="w-4 h-4" />
                        </span>
                      </Button>
                    </label>
                  </div>
                  
                  {formData.imageUrl && showCropper && (
                    <div className="mt-3 space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Кашед барои танзими мавқеи расм, чархро барои калон/хурд кардан истифода баред
                      </p>
                      <div className="relative w-full h-[250px] bg-muted rounded-md overflow-hidden">
                        <Cropper
                          image={formData.imageUrl}
                          crop={crop}
                          zoom={zoom}
                          aspect={16 / 9}
                          onCropChange={setCrop}
                          onZoomChange={setZoom}
                          showGrid={true}
                          style={{
                            containerStyle: {
                              borderRadius: "0.375rem"
                            }
                          }}
                        />
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10" />
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <ZoomOut className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <Slider
                          value={[zoom]}
                          min={1}
                          max={3}
                          step={0.05}
                          onValueChange={(value) => setZoom(value[0])}
                          className="flex-1"
                          data-testid="slider-zoom"
                        />
                        <ZoomIn className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground w-12 text-right flex-shrink-0">
                          {Math.round(zoom * 100)}%
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleResetCrop}
                          data-testid="button-reset-crop"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Тартиб</Label>
                    <Input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                      data-testid="input-banner-order"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-8">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                      data-testid="switch-banner-active"
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
                    data-testid="button-save-banner"
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
        ) : banners.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Image className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Ҳоло баннер нест</h3>
              <p className="text-muted-foreground mb-4">
                Баннери аввалинро илова кунед
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <Card key={banner.id} className="overflow-hidden" data-testid={`banner-card-${banner.id}`}>
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {banner.imageUrl ? (
                    <div className="w-full h-full overflow-hidden">
                      <img 
                        src={banner.imageUrl} 
                        alt={banner.titleTj}
                        className="w-full h-full object-cover"
                        style={{
                          transform: `translate(${-(banner.cropX ?? 0)}%, ${-(banner.cropY ?? 0)}%) scale(${banner.cropZoom ?? 1})`,
                          transformOrigin: "center center"
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    {banner.isActive ? (
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
                  <h3 className="font-semibold mb-1 line-clamp-1">{banner.titleTj}</h3>
                  {banner.subtitleTj && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {banner.subtitleTj}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(banner)}
                      data-testid={`button-edit-banner-${banner.id}`}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Таҳрир
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        if (confirm("Оё мутмаин ҳастед?")) {
                          deleteMutation.mutate(banner.id);
                        }
                      }}
                      data-testid={`button-delete-banner-${banner.id}`}
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
