// AS9100 Kalite ve İş Takip Sistemi - Tip Tanımlamaları

// Kullanıcı Tipleri
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'engineer' | 'technician' | 'auditor';
  department: string;
  avatar?: string;
}

// Görev Tipleri
export type TaskStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: User;
  reporter: User;
  projectId?: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  attachments: Attachment[];
  comments: Comment[];
  estimatedHours?: number;
  actualHours?: number;
}

// Proje Tipleri
export type ProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  manager: User;
  team: User[];
  startDate: Date;
  endDate?: Date;
  budget?: number;
  progress: number;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

// AS9100 Dokümantasyon Tipleri
export type DocumentType = 'manual' | 'procedure' | 'instruction' | 'form' | 'record' | 'policy';
export type DocumentStatus = 'draft' | 'review' | 'approved' | 'obsolete';

export interface Document {
  id: string;
  code: string;
  title: string;
  type: DocumentType;
  version: string;
  status: DocumentStatus;
  owner: User;
  department: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  approvedBy?: User;
  approvedAt?: Date;
  reviewDate?: Date;
  attachments: Attachment[];
  relatedProcesses: string[];
}

// Denetim Tipleri
export type AuditType = 'internal' | 'external' | 'supplier' | 'product' | 'process';
export type AuditStatus = 'scheduled' | 'in_progress' | 'completed' | 'closed';

export interface Audit {
  id: string;
  code: string;
  type: AuditType;
  title: string;
  description: string;
  status: AuditStatus;
  leadAuditor: User;
  auditors: User[];
  auditees: User[];
  startDate: Date;
  endDate?: Date;
  scope: string;
  criteria: string[];
  findings: Finding[];
  report?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Bulgu Tipleri
export type FindingSeverity = 'observation' | 'minor' | 'major' | 'critical';
export type FindingStatus = 'open' | 'in_progress' | 'verified' | 'closed';

export interface Finding {
  id: string;
  auditId: string;
  code: string;
  description: string;
  severity: FindingSeverity;
  status: FindingStatus;
  clauseReference?: string;
  rootCause?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  responsible: User;
  dueDate: Date;
  completedAt?: Date;
  verifiedBy?: User;
  verifiedAt?: Date;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

// Uyumsuzluk Tipleri
export type NCRStatus = 'open' | 'under_review' | 'disposition' | 'in_progress' | 'verified' | 'closed';
export type NCRType = 'product' | 'process' | 'system' | 'supplier';

export interface NCR {
  id: string;
  code: string;
  title: string;
  description: string;
  type: NCRType;
  status: NCRStatus;
  reportedBy: User;
  reportedAt: Date;
  responsible: User;
  department: string;
  productCode?: string;
  batchNumber?: string;
  quantityAffected?: number;
  severity: FindingSeverity;
  containmentAction?: string;
  rootCause?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  dueDate: Date;
  completedAt?: Date;
  verifiedBy?: User;
  verifiedAt?: Date;
  attachments: Attachment[];
  relatedDocuments: Document[];
  createdAt: Date;
  updatedAt: Date;
}

// Eğitim Tipleri
export type TrainingStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Training {
  id: string;
  code: string;
  title: string;
  description: string;
  type: string;
  trainer: User;
  participants: User[];
  startDate: Date;
  endDate?: Date;
  duration: number;
  location: string;
  status: TrainingStatus;
  materials: Attachment[];
  completionRate: number;
  createdAt: Date;
  updatedAt: Date;
}

// Tedarikçi Tipleri
export type SupplierStatus = 'approved' | 'conditional' | 'disapproved' | 'on_hold';

export interface Supplier {
  id: string;
  code: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: SupplierStatus;
  rating?: number;
  lastAudit?: Date;
  nextAudit?: Date;
  certificates: Attachment[];
  performance: SupplierPerformance[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SupplierPerformance {
  id: string;
  supplierId: string;
  period: string;
  qualityScore: number;
  deliveryScore: number;
  serviceScore: number;
  overallScore: number;
  notes?: string;
  createdAt: Date;
}

// Genel Tipler
export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: User;
  uploadedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt?: Date;
}

// Dashboard Tipleri
export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  openNCRs: number;
  openFindings: number;
  upcomingAudits: number;
  documentReviews: number;
  taskCompletionRate: number;
  ncrResolutionRate: number;
  auditComplianceRate: number;
}

export interface Activity {
  id: string;
  type: 'task' | 'ncr' | 'audit' | 'document' | 'training';
  action: string;
  description: string;
  user: User;
  timestamp: Date;
  link?: string;
}

// Risk Değerlendirme Tipleri
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Risk {
  id: string;
  code: string;
  description: string;
  category: string;
  probability: number;
  impact: number;
  riskLevel: RiskLevel;
  mitigationPlan?: string;
  owner: User;
  status: 'open' | 'mitigated' | 'accepted' | 'transferred';
  createdAt: Date;
  updatedAt: Date;
}

// Kalite Hedefleri
export interface QualityObjective {
  id: string;
  code: string;
  title: string;
  description: string;
  target: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  period: string;
  owner: User;
  status: 'not_started' | 'in_progress' | 'achieved' | 'missed';
  actions: string[];
  createdAt: Date;
  updatedAt: Date;
}
