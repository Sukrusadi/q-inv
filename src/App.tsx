import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  FileText,
  ClipboardCheck,
  AlertTriangle,
  GraduationCap,
  Truck,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Shield,
  Target,
  AlertCircle,
  TrendingUp,
  Clock,
  MoreHorizontal,
  Filter,
  Plus,
  Download,
  Calendar,
  Users,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  dashboardStats,
  tasks,
  projects,
  documents,
  audits,
  ncrs,
  trainings,
  suppliers,
  activities,
  users,
  risks,
  qualityObjectives,
} from '@/data/mockData';
import type {
  Task,
  NCR,
} from '@/types';
import './App.css';

type ViewType =
  | 'dashboard'
  | 'tasks'
  | 'projects'
  | 'documents'
  | 'audits'
  | 'ncrs'
  | 'trainings'
  | 'suppliers'
  | 'reports'
  | 'risks'
  | 'objectives';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedNCR, setSelectedNCR] = useState<NCR | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ekran boyutunu kontrol et
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
      review: 'bg-purple-100 text-purple-800 border-purple-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
      open: 'bg-red-100 text-red-800 border-red-200',
      closed: 'bg-green-100 text-green-800 border-green-200',
      verified: 'bg-teal-100 text-teal-800 border-teal-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      draft: 'bg-gray-100 text-gray-800 border-gray-200',
      scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800',
    };
    return variants[priority] || 'bg-gray-100 text-gray-800';
  };

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, string> = {
      observation: 'bg-blue-100 text-blue-800',
      minor: 'bg-yellow-100 text-yellow-800',
      major: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800',
    };
    return variants[severity] || 'bg-gray-100 text-gray-800';
  };

  // Mobil menü öğeleri
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tasks', label: 'Görevler', icon: CheckSquare },
    { id: 'projects', label: 'Projeler', icon: FolderKanban },
    { id: 'documents', label: 'Dokümanlar', icon: FileText },
    { id: 'audits', label: 'Denetimler', icon: ClipboardCheck },
    { id: 'ncrs', label: 'NCR', icon: AlertTriangle },
    { id: 'trainings', label: 'Eğitimler', icon: GraduationCap },
    { id: 'suppliers', label: 'Tedarikçiler', icon: Truck },
    { id: 'risks', label: 'Riskler', icon: AlertCircle },
    { id: 'objectives', label: 'Hedefler', icon: Target },
    { id: 'reports', label: 'Raporlar', icon: BarChart3 },
  ];

  // Dashboard View
  const DashboardView = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Cards - Mobil: 2 sütun, Tablet: 2 sütun, Desktop: 4 sütun */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 p-3 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
              Toplam Görev
            </CardTitle>
            <CheckSquare className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">{dashboardStats.totalTasks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">{dashboardStats.completedTasks}</span>{' '}
              <span className="hidden sm:inline">tamamlandı</span>
              <span className="sm:hidden">tam.</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 p-3 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
              <span className="hidden sm:inline">Açık Uyumsuzluklar</span>
              <span className="sm:hidden">NCR</span>
            </CardTitle>
            <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">{dashboardStats.openNCRs}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-orange-600 font-medium">{dashboardStats.openFindings}</span>{' '}
              <span className="hidden sm:inline">açık bulgu</span>
              <span className="sm:hidden">bulgu</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 p-3 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
              <span className="hidden sm:inline">Yaklaşan Denetimler</span>
              <span className="sm:hidden">Denetim</span>
            </CardTitle>
            <ClipboardCheck className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">{dashboardStats.upcomingAudits}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-blue-600 font-medium">{dashboardStats.documentReviews}</span>{' '}
              <span className="hidden sm:inline">doküman</span>
              <span className="sm:hidden">dok.</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 p-3 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
              <span className="hidden sm:inline">Görev Tamamlama</span>
              <span className="sm:hidden">Tamamlama</span>
            </CardTitle>
            <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">%{dashboardStats.taskCompletionRate}</div>
            <Progress value={dashboardStats.taskCompletionRate} className="mt-2 h-1.5 md:h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">Bekleyen Görevler</CardTitle>
            <CardDescription className="text-xs md:text-sm">Son eklenen görevler</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="space-y-3">
              {tasks.slice(0, isMobile ? 3 : 5).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 md:p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        task.priority === 'critical'
                          ? 'bg-red-500'
                          : task.priority === 'high'
                          ? 'bg-orange-500'
                          : task.priority === 'medium'
                          ? 'bg-blue-500'
                          : 'bg-gray-500'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {task.assignee.name} • {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${getStatusBadge(task.status)} text-xs flex-shrink-0 ml-2`}>
                    {task.status === 'pending' && <span className="hidden sm:inline">Bekliyor</span>}
                    {task.status === 'pending' && <span className="sm:hidden">Bek.</span>}
                    {task.status === 'in_progress' && <span className="hidden sm:inline">Devam</span>}
                    {task.status === 'in_progress' && <span className="sm:hidden">Dev.</span>}
                    {task.status === 'review' && 'İnceleme'}
                    {task.status === 'completed' && <span className="hidden sm:inline">Tamamlandı</span>}
                    {task.status === 'completed' && <span className="sm:hidden">Tam.</span>}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">Son Aktiviteler</CardTitle>
            <CardDescription className="text-xs md:text-sm">Sistemdeki son işlemler</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <ScrollArea className="h-[250px] md:h-[300px]">
              <div className="space-y-3 md:space-y-4">
                {activities.slice(0, isMobile ? 4 : 6).map((activity) => (
                  <div key={activity.id} className="flex gap-2 md:gap-3">
                    <Avatar className="h-7 w-7 md:h-8 md:w-8 flex-shrink-0">
                      <AvatarImage src={activity.user.avatar} />
                      <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm">
                        <span className="font-medium">{activity.user.name}</span>{' '}
                        <span className="text-muted-foreground">{activity.action.toLowerCase()}</span>
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(activity.timestamp).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <Card>
          <CardHeader className="pb-2 p-4 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium">NCR Çözüm Oranı</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex-1">
                <Progress value={dashboardStats.ncrResolutionRate} className="h-1.5 md:h-2" />
              </div>
              <span className="text-base md:text-lg font-bold">%{dashboardStats.ncrResolutionRate}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 p-4 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium">Denetim Uygunluk</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex-1">
                <Progress value={dashboardStats.auditComplianceRate} className="h-1.5 md:h-2" />
              </div>
              <span className="text-base md:text-lg font-bold">%{dashboardStats.auditComplianceRate}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 p-4 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium">Gecikmiş Görevler</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
              <span className="text-lg md:text-xl font-bold">{dashboardStats.overdueTasks}</span>
              <span className="text-xs md:text-sm text-muted-foreground">görev gecikmiş</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Tasks View - Mobil Kart Görünümü
  const TasksView = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Görevler</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Tüm görevleri görüntüleyin</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Filtrele</span>
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Yeni Görev</span>
            <span className="sm:hidden">Yeni</span>
          </Button>
        </div>
      </div>

      {/* Mobil: Kart görünümü */}
      <div className="block lg:hidden space-y-3">
        {tasks.map((task) => (
          <Card 
            key={task.id} 
            className="cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => setSelectedTask(task)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{task.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{task.description}</p>
                </div>
                <Badge variant="outline" className={`${getStatusBadge(task.status)} text-xs flex-shrink-0`}>
                  {task.status === 'pending' && 'Bek.'}
                  {task.status === 'in_progress' && 'Dev.'}
                  {task.status === 'review' && 'İnc.'}
                  {task.status === 'completed' && 'Tam.'}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: Tablo görünümü */}
      <Card className="hidden lg:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Görev</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Öncelik</TableHead>
                <TableHead>Atanan</TableHead>
                <TableHead>Bitiş</TableHead>
                <TableHead>İlerleme</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {task.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(task.status)}>
                      {task.status === 'pending' && 'Bekliyor'}
                      {task.status === 'in_progress' && 'Devam Ediyor'}
                      {task.status === 'review' && 'İncelemede'}
                      {task.status === 'completed' && 'Tamamlandı'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityBadge(task.priority)}>
                      {task.priority === 'low' && 'Düşük'}
                      {task.priority === 'medium' && 'Orta'}
                      {task.priority === 'high' && 'Yüksek'}
                      {task.priority === 'critical' && 'Kritik'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.assignee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString('tr-TR')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={
                          task.actualHours && task.estimatedHours
                            ? (task.actualHours / task.estimatedHours) * 100
                            : 0
                        }
                        className="w-20 h-2"
                      />
                      <span className="text-xs text-muted-foreground">
                        {task.actualHours || 0}/{task.estimatedHours || 0}s
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedTask(task)}>
                          Detayları Gör
                        </DropdownMenuItem>
                        <DropdownMenuItem>Düzenle</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Projects View
  const ProjectsView = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Projeler</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Projeleri yönetin</p>
        </div>
        <Button size="sm" className="flex-1 sm:flex-none">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Yeni Proje</span>
          <span className="sm:hidden">Yeni</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base md:text-lg truncate">{project.name}</CardTitle>
                  <CardDescription className="mt-1 text-xs md:text-sm line-clamp-2">{project.description}</CardDescription>
                </div>
                <Badge variant="outline" className={`${getStatusBadge(project.status)} text-xs flex-shrink-0`}>
                  {project.status === 'planning' && 'Plan'}
                  {project.status === 'active' && 'Aktif'}
                  {project.status === 'on_hold' && 'Bekle'}
                  {project.status === 'completed' && 'Tamam'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="space-y-3 md:space-y-4">
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-1">
                    <span className="text-muted-foreground">İlerleme</span>
                    <span className="font-medium">%{project.progress}</span>
                  </div>
                  <Progress value={project.progress} className="h-1.5 md:h-2" />
                </div>

                <div className="flex items-center justify-between text-xs md:text-sm">
                  <div className="flex items-center gap-1 md:gap-2">
                    <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    <span>{project.team.length} kişi</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    <span>{new Date(project.startDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t">
                  <Avatar className="h-5 w-5 md:h-6 md:w-6">
                    <AvatarImage src={project.manager.avatar} />
                    <AvatarFallback>{project.manager.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs md:text-sm text-muted-foreground truncate">{project.manager.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Documents View
  const DocumentsView = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Dokümanlar</h2>
          <p className="text-xs md:text-sm text-muted-foreground">AS9100 dokümantasyon</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">İndir</span>
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Yeni</span>
          </Button>
        </div>
      </div>

      {/* Mobil Kart Görünümü */}
      <div className="block lg:hidden space-y-3">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{doc.code}</p>
                  <p className="text-sm text-muted-foreground truncate">{doc.title}</p>
                </div>
                <Badge variant="outline" className={`${getStatusBadge(doc.status)} text-xs flex-shrink-0`}>
                  {doc.status === 'draft' && 'Taslak'}
                  {doc.status === 'review' && 'İnceleme'}
                  {doc.status === 'approved' && 'Onaylı'}
                  {doc.status === 'obsolete' && 'Eski'}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs">
                <span className="text-muted-foreground">v{doc.version}</span>
                <span className="text-muted-foreground">{doc.owner.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Tablo */}
      <Card className="hidden lg:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kod</TableHead>
                <TableHead>Başlık</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Versiyon</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Sahip</TableHead>
                <TableHead>Güncelleme</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.code}</TableCell>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {doc.type === 'manual' && 'El Kitabı'}
                      {doc.type === 'procedure' && 'Prosedür'}
                      {doc.type === 'instruction' && 'Talimat'}
                      {doc.type === 'form' && 'Form'}
                      {doc.type === 'record' && 'Kayıt'}
                      {doc.type === 'policy' && 'Politika'}
                    </Badge>
                  </TableCell>
                  <TableCell>v{doc.version}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(doc.status)}>
                      {doc.status === 'draft' && 'Taslak'}
                      {doc.status === 'review' && 'İncelemede'}
                      {doc.status === 'approved' && 'Onaylı'}
                      {doc.status === 'obsolete' && 'Eski'}
                    </Badge>
                  </TableCell>
                  <TableCell>{doc.owner.name}</TableCell>
                  <TableCell>{new Date(doc.updatedAt).toLocaleDateString('tr-TR')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // NCRs View - Mobil Kart Görünümü
  const NCRsView = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">NCR</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Uyumsuzluk raporları</p>
        </div>
        <Button size="sm" className="flex-1 sm:flex-none">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Yeni NCR</span>
          <span className="sm:hidden">Yeni</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {ncrs.map((ncr) => (
          <Card
            key={ncr.id}
            className="cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => setSelectedNCR(ncr)}
          >
            <CardHeader className="p-4 pb-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium text-muted-foreground">{ncr.code}</span>
                <Badge variant="outline" className={`${getStatusBadge(ncr.status)} text-xs`}>
                  {ncr.status === 'open' && 'Açık'}
                  {ncr.status === 'under_review' && 'İnceleme'}
                  {ncr.status === 'disposition' && 'Tasfiye'}
                  {ncr.status === 'in_progress' && 'Devam'}
                  {ncr.status === 'verified' && 'Doğrulandı'}
                  {ncr.status === 'closed' && 'Kapalı'}
                </Badge>
              </div>
              <CardTitle className="text-sm md:text-base mt-2">{ncr.title}</CardTitle>
              <CardDescription className="text-xs md:text-sm line-clamp-2">{ncr.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Şiddet:</span>
                  <Badge variant="outline" className={`${getSeverityBadge(ncr.severity)} text-xs`}>
                    {ncr.severity === 'observation' && 'Gözlem'}
                    {ncr.severity === 'minor' && 'Minor'}
                    {ncr.severity === 'major' && 'Major'}
                    {ncr.severity === 'critical' && 'Kritik'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Tip:</span>
                  <Badge variant="secondary" className="text-xs">
                    {ncr.type === 'product' && 'Ürün'}
                    {ncr.type === 'process' && 'Süreç'}
                    {ncr.type === 'system' && 'Sistem'}
                    {ncr.type === 'supplier' && 'Tedarikçi'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Termin:</span>
                  <span>{new Date(ncr.dueDate).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Audits View
  const AuditsView = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Denetimler</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Denetim yönetimi</p>
        </div>
        <Button size="sm" className="flex-1 sm:flex-none">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Yeni Denetim</span>
          <span className="sm:hidden">Yeni</span>
        </Button>
      </div>

      <div className="space-y-3 md:space-y-4">
        {audits.map((audit) => (
          <Card key={audit.id}>
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-base md:text-lg">{audit.title}</CardTitle>
                    <span className="text-xs text-muted-foreground">({audit.code})</span>
                  </div>
                  <CardDescription className="mt-1 text-xs md:text-sm">{audit.description}</CardDescription>
                </div>
                <Badge variant="outline" className={`${getStatusBadge(audit.status)} text-xs flex-shrink-0 self-start`}>
                  {audit.status === 'scheduled' && 'Planlandı'}
                  {audit.status === 'in_progress' && 'Devam'}
                  {audit.status === 'completed' && 'Tamamlandı'}
                  {audit.status === 'closed' && 'Kapalı'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  <span>{new Date(audit.startDate).toLocaleDateString('tr-TR')}</span>
                  {audit.endDate && (
                    <span>- {new Date(audit.endDate).toLocaleDateString('tr-TR')}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm text-muted-foreground">Baş Denetçi:</span>
                  <div className="flex items-center gap-1 md:gap-2">
                    <Avatar className="h-5 w-5 md:h-6 md:w-6">
                      <AvatarImage src={audit.leadAuditor.avatar} />
                      <AvatarFallback>{audit.leadAuditor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs md:text-sm">{audit.leadAuditor.name}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Suppliers View
  const SuppliersView = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Tedarikçiler</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Onaylı tedarikçi listesi</p>
        </div>
        <Button size="sm" className="flex-1 sm:flex-none">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Yeni Tedarikçi</span>
          <span className="sm:hidden">Yeni</span>
        </Button>
      </div>

      {/* Mobil Kart Görünümü */}
      <div className="block lg:hidden space-y-3">
        {suppliers.map((supplier) => (
          <Card key={supplier.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{supplier.name}</p>
                  <p className="text-xs text-muted-foreground">{supplier.contactPerson}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`
                    ${supplier.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                    ${supplier.status === 'conditional' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${supplier.status === 'disapproved' ? 'bg-red-100 text-red-800' : ''}
                    text-xs flex-shrink-0
                  `}
                >
                  {supplier.status === 'approved' && 'Onaylı'}
                  {supplier.status === 'conditional' && 'Şartlı'}
                  {supplier.status === 'disapproved' && 'Onaysız'}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <div className="flex items-center gap-2">
                  <Progress value={(supplier.rating || 0) * 20} className="w-16 h-1.5" />
                  <span className="text-xs">{supplier.rating}/5</span>
                </div>
                <span className="text-xs text-muted-foreground">{supplier.category}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Tablo */}
      <Card className="hidden lg:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kod</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Puan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.code}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{supplier.name}</p>
                      <p className="text-xs text-muted-foreground">{supplier.contactPerson}</p>
                    </div>
                  </TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`
                        ${supplier.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                        ${supplier.status === 'conditional' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${supplier.status === 'disapproved' ? 'bg-red-100 text-red-800' : ''}
                      `}
                    >
                      {supplier.status === 'approved' && 'Onaylı'}
                      {supplier.status === 'conditional' && 'Şartlı'}
                      {supplier.status === 'disapproved' && 'Onaysız'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(supplier.rating || 0) * 20} className="w-16 h-2" />
                      <span className="text-sm">{supplier.rating}/5</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Trainings View
  const TrainingsView = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Eğitimler</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Eğitim planlama</p>
        </div>
        <Button size="sm" className="flex-1 sm:flex-none">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Yeni Eğitim</span>
          <span className="sm:hidden">Yeni</span>
        </Button>
      </div>

      <div className="space-y-3 md:space-y-4">
        {trainings.map((training) => (
          <Card key={training.id}>
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-base md:text-lg">{training.title}</CardTitle>
                  <CardDescription className="mt-1 text-xs md:text-sm">{training.description}</CardDescription>
                </div>
                <Badge variant="outline" className={`${getStatusBadge(training.status)} text-xs flex-shrink-0 self-start`}>
                  {training.status === 'scheduled' && 'Planlandı'}
                  {training.status === 'in_progress' && 'Devam'}
                  {training.status === 'completed' && 'Tamamlandı'}
                  {training.status === 'cancelled' && 'İptal'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-4 text-xs md:text-sm">
                  <div className="flex items-center gap-1 md:gap-2">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    <span>{new Date(training.startDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    <span>{training.duration} saat</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-1">
                    <span className="text-muted-foreground">Tamamlama</span>
                    <span className="font-medium">%{training.completionRate}</span>
                  </div>
                  <Progress value={training.completionRate} className="h-1.5 md:h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Reports View
  const ReportsView = () => (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">Raporlar</h2>
        <p className="text-xs md:text-sm text-muted-foreground">Kalite yönetimi raporları</p>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="w-full flex-wrap h-auto gap-1">
          <TabsTrigger value="performance" className="text-xs md:text-sm flex-1">Performans</TabsTrigger>
          <TabsTrigger value="ncr" className="text-xs md:text-sm flex-1">NCR</TabsTrigger>
          <TabsTrigger value="audit" className="text-xs md:text-sm flex-1">Denetim</TabsTrigger>
          <TabsTrigger value="kpi" className="text-xs md:text-sm flex-1">KPI</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-sm md:text-base">Görev Tamamlama</CardTitle>
                <CardDescription className="text-xs md:text-sm">Aylık tamamlama oranları</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="h-[150px] md:h-[200px] flex items-end justify-between gap-1 md:gap-2">
                  {[65, 72, 68, 75, 82, 78, 85, 88, 92, 89, 94, 96].map((value, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className="w-full bg-primary/20 rounded-t"
                        style={{ height: `${value * 1.5}px` }}
                      />
                      <span className="text-[10px] md:text-xs text-muted-foreground">{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-sm md:text-base">NCR Çözüm Süresi</CardTitle>
                <CardDescription className="text-xs md:text-sm">Ortalama çözüm süreleri (gün)</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="h-[150px] md:h-[200px] flex items-end justify-between gap-1 md:gap-2">
                  {[12, 10, 14, 8, 11, 9, 7, 10, 6, 8, 5, 7].map((value, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className="w-full bg-orange-200 rounded-t"
                        style={{ height: `${value * 12}px` }}
                      />
                      <span className="text-[10px] md:text-xs text-muted-foreground">{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kpi" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {qualityObjectives.map((objective) => (
              <Card key={objective.id}>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-sm md:text-base">{objective.title}</CardTitle>
                  <CardDescription className="text-xs md:text-sm">{objective.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">Hedef:</span>
                      <span className="font-medium">{objective.target}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">Mevcut:</span>
                      <span className="font-medium text-base md:text-lg">
                        {objective.currentValue}{objective.unit}
                      </span>
                    </div>
                    <Progress value={(objective.currentValue / objective.targetValue) * 100} className="h-1.5 md:h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  // Risks View
  const RisksView = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Riskler</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Risk değerlendirme</p>
        </div>
        <Button size="sm" className="flex-1 sm:flex-none">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Yeni Risk</span>
          <span className="sm:hidden">Yeni</span>
        </Button>
      </div>

      {/* Mobil Kart Görünümü */}
      <div className="block lg:hidden space-y-3">
        {risks.map((risk) => (
          <Card key={risk.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{risk.code}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{risk.description}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`
                    ${risk.riskLevel === 'critical' ? 'bg-red-100 text-red-800' : ''}
                    ${risk.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' : ''}
                    ${risk.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${risk.riskLevel === 'low' ? 'bg-green-100 text-green-800' : ''}
                    text-xs flex-shrink-0
                  `}
                >
                  {risk.riskLevel === 'critical' && 'Kritik'}
                  {risk.riskLevel === 'high' && 'Yüksek'}
                  {risk.riskLevel === 'medium' && 'Orta'}
                  {risk.riskLevel === 'low' && 'Düşük'}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs">
                <span className="text-muted-foreground">Olasılık: {risk.probability}/5</span>
                <span className="text-muted-foreground">Etki: {risk.impact}/5</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Tablo */}
      <Card className="hidden lg:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kod</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Seviye</TableHead>
                <TableHead>Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell className="font-medium">{risk.code}</TableCell>
                  <TableCell>{risk.description}</TableCell>
                  <TableCell>{risk.category}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`
                        ${risk.riskLevel === 'critical' ? 'bg-red-100 text-red-800' : ''}
                        ${risk.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' : ''}
                        ${risk.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${risk.riskLevel === 'low' ? 'bg-green-100 text-green-800' : ''}
                      `}
                    >
                      {risk.riskLevel === 'critical' && 'Kritik'}
                      {risk.riskLevel === 'high' && 'Yüksek'}
                      {risk.riskLevel === 'medium' && 'Orta'}
                      {risk.riskLevel === 'low' && 'Düşük'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(risk.status)}>
                      {risk.status === 'open' && 'Açık'}
                      {risk.status === 'mitigated' && 'Azaltıldı'}
                      {risk.status === 'accepted' && 'Kabul'}
                      {risk.status === 'transferred' && 'Transfer'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Objectives View
  const ObjectivesView = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Hedefler</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Kalite hedefleri</p>
        </div>
        <Button size="sm" className="flex-1 sm:flex-none">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Yeni Hedef</span>
          <span className="sm:hidden">Yeni</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {qualityObjectives.map((objective) => (
          <Card key={objective.id}>
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm md:text-base">{objective.title}</CardTitle>
                <Badge 
                  variant="outline"
                  className={`
                    ${objective.status === 'achieved' ? 'bg-green-100 text-green-800' : ''}
                    ${objective.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : ''}
                    text-xs flex-shrink-0
                  `}
                >
                  {objective.status === 'not_started' && 'Başlanmadı'}
                  {objective.status === 'in_progress' && 'Devam'}
                  {objective.status === 'achieved' && 'Başarıldı'}
                </Badge>
              </div>
              <CardDescription className="text-xs md:text-sm mt-1">{objective.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Hedef:</span>
                  <span className="font-medium">{objective.target}</span>
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Mevcut:</span>
                  <span className="font-medium text-base md:text-lg">
                    {objective.currentValue}{objective.unit}
                  </span>
                </div>
                <Progress value={(objective.currentValue / objective.targetValue) * 100} className="h-1.5 md:h-2" />
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Avatar className="h-5 w-5 md:h-6 md:w-6">
                    <AvatarImage src={objective.owner.avatar} />
                    <AvatarFallback>{objective.owner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs md:text-sm">{objective.owner.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'tasks':
        return <TasksView />;
      case 'projects':
        return <ProjectsView />;
      case 'documents':
        return <DocumentsView />;
      case 'audits':
        return <AuditsView />;
      case 'ncrs':
        return <NCRsView />;
      case 'trainings':
        return <TrainingsView />;
      case 'suppliers':
        return <SuppliersView />;
      case 'reports':
        return <ReportsView />;
      case 'risks':
        return <RisksView />;
      case 'objectives':
        return <ObjectivesView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex ${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-card border-r transition-all duration-300 flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">AS9100</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            <Button
              variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
              onClick={() => setCurrentView('dashboard')}
            >
              <LayoutDashboard className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Dashboard</span>}
            </Button>

            <Separator className="my-2" />

            {sidebarOpen && (
              <p className="px-2 text-xs font-medium text-muted-foreground mb-2">İş Takibi</p>
            )}
            <Button
              variant={currentView === 'tasks' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
              onClick={() => setCurrentView('tasks')}
            >
              <CheckSquare className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Görevler</span>}
            </Button>
            <Button
              variant={currentView === 'projects' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
              onClick={() => setCurrentView('projects')}
            >
              <FolderKanban className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Projeler</span>}
            </Button>

            <Separator className="my-2" />

            {sidebarOpen && (
              <p className="px-2 text-xs font-medium text-muted-foreground mb-2">AS9100 Kalite</p>
            )}
            <Button
              variant={currentView === 'documents' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
              onClick={() => setCurrentView('documents')}
            >
              <FileText className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Dokümanlar</span>}
            </Button>
            <Button
              variant={currentView === 'audits' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
              onClick={() => setCurrentView('audits')}
            >
              <ClipboardCheck className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Denetimler</span>}
            </Button>
            <Button
              variant={currentView === 'ncrs' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
              onClick={() => setCurrentView('ncrs')}
            >
              <AlertTriangle className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">NCR</span>}
            </Button>
            <Button
              variant={currentView === 'trainings' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
              onClick={() => setCurrentView('trainings')}
            >
              <GraduationCap className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Eğitimler</span>}
            </Button>
            <Button
              variant={currentView === 'suppliers' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
              onClick={() => setCurrentView('suppliers')}
            >
              <Truck className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Tedarikçiler</span>}
            </Button>

            <Separator className="my-2" />

            {sidebarOpen && (
              <p className="px-2 text-xs font-medium text-muted-foreground mb-2">Raporlama</p>
            )}
            <Button
              variant={currentView === 'risks' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
              onClick={() => setCurrentView('risks')}
            >
              <AlertCircle className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Riskler</span>}
            </Button>
            <Button
              variant={currentView === 'objectives' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
              onClick={() => setCurrentView('objectives')}
            >
              <Target className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Hedefler</span>}
            </Button>
            <Button
              variant={currentView === 'reports' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${!sidebarOpen && 'justify-center px-2'}`}
              onClick={() => setCurrentView('reports')}
            >
              <BarChart3 className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Raporlar</span>}
            </Button>
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 md:h-16 border-b bg-card flex items-center justify-between px-3 md:px-4">
          <div className="flex items-center gap-2 md:gap-4 flex-1">
            {/* Mobil Menü Butonu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    AS9100 QMS
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-80px)]">
                  <nav className="space-y-1 p-4">
                    {menuItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={currentView === item.id ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => {
                          setCurrentView(item.id as ViewType);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Button>
                    ))}
                  </nav>
                </ScrollArea>
              </SheetContent>
            </Sheet>

            <div className="relative flex-1 max-w-[200px] md:max-w-96">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Ara..." className="pl-8 h-8 md:h-10 text-sm" />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 md:gap-2 px-1 md:px-2">
                  <Avatar className="h-7 w-7 md:h-8 md:w-8">
                    <AvatarImage src={users[0].avatar} />
                    <AvatarFallback>{users[0].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm">{users[0].name}</span>
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4 hidden sm:inline" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 md:w-56">
                <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Ayarlar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Çıkış
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-3 md:p-6">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>

        {/* Mobil Alt Navigasyon */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t px-2 py-1 z-50">
          <div className="flex justify-around items-center">
            <Button
              variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
              size="sm"
              className="flex-col h-12 px-2"
              onClick={() => setCurrentView('dashboard')}
            >
              <Home className="h-4 w-4" />
              <span className="text-[10px] mt-0.5">Ana Sayfa</span>
            </Button>
            <Button
              variant={currentView === 'tasks' ? 'secondary' : 'ghost'}
              size="sm"
              className="flex-col h-12 px-2"
              onClick={() => setCurrentView('tasks')}
            >
              <CheckSquare className="h-4 w-4" />
              <span className="text-[10px] mt-0.5">Görevler</span>
            </Button>
            <Button
              variant={currentView === 'ncrs' ? 'secondary' : 'ghost'}
              size="sm"
              className="flex-col h-12 px-2"
              onClick={() => setCurrentView('ncrs')}
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="text-[10px] mt-0.5">NCR</span>
            </Button>
            <Button
              variant={currentView === 'reports' ? 'secondary' : 'ghost'}
              size="sm"
              className="flex-col h-12 px-2"
              onClick={() => setCurrentView('reports')}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="text-[10px] mt-0.5">Raporlar</span>
            </Button>
          </div>
        </nav>

        {/* Mobil için alt boşluk */}
        <div className="lg:hidden h-14" />
      </div>

      {/* Task Detail Dialog */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg">{selectedTask?.title}</DialogTitle>
            <DialogDescription className="text-sm">{selectedTask?.description}</DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Durum:</span>
                  <Badge variant="outline" className={`ml-2 ${getStatusBadge(selectedTask.status)}`}>
                    {selectedTask.status === 'pending' && 'Bekliyor'}
                    {selectedTask.status === 'in_progress' && 'Devam Ediyor'}
                    {selectedTask.status === 'review' && 'İncelemede'}
                    {selectedTask.status === 'completed' && 'Tamamlandı'}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Öncelik:</span>
                  <Badge
                    variant="outline"
                    className={`ml-2 ${getPriorityBadge(selectedTask.priority)}`}
                  >
                    {selectedTask.priority === 'low' && 'Düşük'}
                    {selectedTask.priority === 'medium' && 'Orta'}
                    {selectedTask.priority === 'high' && 'Yüksek'}
                    {selectedTask.priority === 'critical' && 'Kritik'}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Atanan:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={selectedTask.assignee.avatar} />
                      <AvatarFallback>{selectedTask.assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{selectedTask.assignee.name}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Bitiş Tarihi:</span>
                  <p className="text-sm">{new Date(selectedTask.dueDate).toLocaleDateString('tr-TR')}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* NCR Detail Dialog */}
      <Dialog open={!!selectedNCR} onOpenChange={() => setSelectedNCR(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg">
              {selectedNCR?.code} - {selectedNCR?.title}
            </DialogTitle>
            <DialogDescription className="text-sm">{selectedNCR?.description}</DialogDescription>
          </DialogHeader>
          {selectedNCR && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Durum:</span>
                  <Badge variant="outline" className={`ml-2 ${getStatusBadge(selectedNCR.status)}`}>
                    {selectedNCR.status === 'open' && 'Açık'}
                    {selectedNCR.status === 'under_review' && 'İncelemede'}
                    {selectedNCR.status === 'disposition' && 'Tasfiye'}
                    {selectedNCR.status === 'in_progress' && 'Devam Ediyor'}
                    {selectedNCR.status === 'verified' && 'Doğrulandı'}
                    {selectedNCR.status === 'closed' && 'Kapatıldı'}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Şiddet:</span>
                  <Badge
                    variant="outline"
                    className={`ml-2 ${getSeverityBadge(selectedNCR.severity)}`}
                  >
                    {selectedNCR.severity === 'observation' && 'Gözlem'}
                    {selectedNCR.severity === 'minor' && 'Minor'}
                    {selectedNCR.severity === 'major' && 'Major'}
                    {selectedNCR.severity === 'critical' && 'Kritik'}
                  </Badge>
                </div>
              </div>

              {selectedNCR.containmentAction && (
                <div>
                  <span className="text-sm text-muted-foreground">Tutma Aksiyonu:</span>
                  <p className="mt-1 text-sm">{selectedNCR.containmentAction}</p>
                </div>
              )}

              {selectedNCR.rootCause && (
                <div>
                  <span className="text-sm text-muted-foreground">Kök Neden:</span>
                  <p className="mt-1 text-sm">{selectedNCR.rootCause}</p>
                </div>
              )}

              {selectedNCR.correctiveAction && (
                <div>
                  <span className="text-sm text-muted-foreground">Düzeltici Aksiyon:</span>
                  <p className="mt-1 text-sm">{selectedNCR.correctiveAction}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
