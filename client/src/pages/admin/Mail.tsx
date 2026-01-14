import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/lib/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  ArrowLeft, Mail, Trash2, User, Phone, 
  Clock, LayoutDashboard, LogOut, Eye
} from "lucide-react";
import type { ContactSubmission } from "@shared/schema";
import { format } from "date-fns";

export default function AdminMail() {
  const [, setLocation] = useLocation();
  const { admin, logout, token, isLoading: authLoading } = useAdmin();
  const { toast } = useToast();

  const { data: submissions = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact/submissions"],
    enabled: !!token
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/contact/submissions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact/submissions"] });
      toast({
        title: "Нест карда шуд",
        description: "Паём бомуваффақият нест карда шуд"
      });
    },
    onError: () => {
      toast({
        title: "Хатогӣ",
        description: "Ҳангоми нест кардан хатогӣ рух дод",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    if (!authLoading && !admin) {
      setLocation("/admin/login");
    }
  }, [authLoading, admin, setLocation]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-pulse text-muted-foreground">Боргирӣ...</div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    setLocation("/admin/login");
  };

  const handleDelete = (id: string) => {
    if (confirm("Оё шумо мутмаин ҳастед, ки мехоҳед ин паёмро нест кунед?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Панели идоракунӣ</h1>
              <p className="text-sm text-muted-foreground">{admin.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" data-testid="button-view-site">
                <Eye className="w-4 h-4 mr-2" />
                Дидани сайт
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              data-testid="button-admin-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Баромадан
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Бозгашт
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Почта</h2>
              <p className="text-muted-foreground text-sm">
                Паёмҳои аз форми тамос
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {submissions.length} паём
          </Badge>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Ҳоло паём нест</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className="hover-elevate" data-testid={`mail-item-${submission.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base" data-testid={`mail-name-${submission.id}`}>
                          {submission.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground" data-testid={`mail-email-${submission.id}`}>
                          {submission.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {format(new Date(submission.createdAt), "dd.MM.yyyy HH:mm")}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(submission.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-mail-${submission.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {submission.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Phone className="w-4 h-4" />
                      <span data-testid={`mail-phone-${submission.id}`}>{submission.phone}</span>
                    </div>
                  )}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm whitespace-pre-wrap" data-testid={`mail-message-${submission.id}`}>
                      {submission.message}
                    </p>
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
