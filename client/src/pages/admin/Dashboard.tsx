import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/lib/AdminContext";
import { 
  LayoutDashboard, Image, Newspaper, LogOut, 
  ArrowRight, Eye, EyeOff 
} from "lucide-react";
import type { Banner, News } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { admin, logout, token, isLoading: authLoading } = useAdmin();

  const { data: banners = [] } = useQuery<Banner[]>({
    queryKey: ["/api/banners?includeInactive=true"],
    enabled: !!token
  });

  const { data: news = [] } = useQuery<News[]>({
    queryKey: ["/api/news?includeInactive=true"],
    enabled: !!token
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

  const handleLogout = async () => {
    await logout();
    setLocation("/admin/login");
  };

  const activeBanners = banners.filter(b => b.isActive).length;
  const activeNews = news.filter(n => n.isActive).length;

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
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Хуш омадед!</h2>
          <p className="text-muted-foreground">
            Аз ин ҷо шумо метавонед баннерҳо ва хабарҳоро идора кунед
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover-elevate" data-testid="card-banners-summary">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-lg font-medium">Баннерҳо</CardTitle>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold">{banners.length}</div>
                  <p className="text-sm text-muted-foreground">
                    {activeBanners} фаъол
                  </p>
                </div>
                <Link href="/admin/banners">
                  <Button size="sm" data-testid="button-manage-banners">
                    Идоракунӣ
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate" data-testid="card-news-summary">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-lg font-medium">Хабарҳо</CardTitle>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold">{news.length}</div>
                  <p className="text-sm text-muted-foreground">
                    {activeNews} фаъол
                  </p>
                </div>
                <Link href="/admin/news">
                  <Button size="sm" data-testid="button-manage-news">
                    Идоракунӣ
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card data-testid="card-recent-banners">
            <CardHeader>
              <CardTitle className="text-lg">Охирин баннерҳо</CardTitle>
            </CardHeader>
            <CardContent>
              {banners.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Ҳоло баннер нест
                </p>
              ) : (
                <div className="space-y-3">
                  {banners.slice(0, 5).map((banner) => (
                    <div 
                      key={banner.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      data-testid={`banner-item-${banner.id}`}
                    >
                      <div className="flex items-center gap-3">
                        {banner.imageUrl ? (
                          <img 
                            src={banner.imageUrl} 
                            alt={banner.titleTj}
                            className="w-12 h-8 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                            <Image className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <span className="font-medium text-sm line-clamp-1">
                          {banner.titleTj}
                        </span>
                      </div>
                      {banner.isActive ? (
                        <Eye className="w-4 h-4 text-green-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card data-testid="card-recent-news">
            <CardHeader>
              <CardTitle className="text-lg">Охирин хабарҳо</CardTitle>
            </CardHeader>
            <CardContent>
              {news.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Ҳоло хабар нест
                </p>
              ) : (
                <div className="space-y-3">
                  {news.slice(0, 5).map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      data-testid={`news-item-${item.id}`}
                    >
                      <div className="flex items-center gap-3">
                        {item.imageUrl ? (
                          <img 
                            src={item.imageUrl} 
                            alt={item.titleTj}
                            className="w-12 h-8 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                            <Newspaper className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <span className="font-medium text-sm line-clamp-1">
                          {item.titleTj}
                        </span>
                      </div>
                      {item.isActive ? (
                        <Eye className="w-4 h-4 text-green-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
