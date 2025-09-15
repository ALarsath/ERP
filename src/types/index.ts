// Application-wide types and interfaces

// User types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
}

// Login form values
interface LoginFormValues {
  username: string;
  password: string;
  remember?: boolean;
}

// Attendance records
interface SubjectRecord {
  key: string;
  subject: string;
  teacher: string;
  presentClasses: number;
  totalClasses: number;
  present: number;
  color: string;
}

interface AttendanceRecord {
  key: string;
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  duration: string;
  teacher: string;
  remarks?: string;
}

// Dashboard data
interface AcademicStats {
  rank: number;
  totalStudents: number;
  averageScore: number;
  attendance: number;
  completedProjects: number;
  totalProjects: number;
  upcomingExams: number;
  pendingAssignments: number;
}

interface Project {
  key: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'in-progress' | 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  instructor: string;
}

interface ScheduleItem {
  time: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
}

// Examination data
interface Exam {
  key: string;
  subject: string;
  examType: string;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'completed' | 'in-progress' | 'cancelled';
  duration: string;
  instructor: string;
  totalMarks: number;
  instructions?: string;
  priority: 'high' | 'medium' | 'low';
}

interface ExamResult {
  subject: string;
  examType: string;
  date: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  percentage: number;
  rank: number;
  remarks: string;
  resultStatus: 'pass' | 'fail' | 'pending';
}

interface ExamStats {
  totalExams: number;
  upcomingExams: number;
  completedExams: number;
  averageScore: number;
  highestScore: number;
  currentRank: number;
  totalStudents: number;
  passRate: number;
  improvementRate: number;
}

// Fee management
interface FeeDetail {
  key: string;
  feeType: string;
  category: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'overdue' | 'pending';
  paidAmount: number;
  remainingAmount: number;
  lateFee?: number;
  discount?: number;
  installments?: number;
  currentInstallment?: number;
}

interface PaymentMethod {
  type: 'credit_card' | 'bank_transfer' | 'cash' | 'upi';
  lastFourDigits?: string;
  expiryDate?: string;
}

// Personal information
interface BasicInfo {
  name: string;
  admissionNo: string;
  class: string;
  rollNo: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string | Dayjs;
  bloodGroup: string;
  nationality: string;
  religion: string;
  caste: string;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'Other';
  motherTongue: string;
  language: string;
}

interface ContactInfo {
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
  email: string;
  emergencyContact: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
}

interface ParentInfo {
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  fatherEmail: string;
  motherName: string;
  motherOccupation: string;
  motherPhone: string;
  motherEmail: string;
}

interface ExtracurricularInfo {
  sportsActivities: string[];
  clubs: string[];
  achievements: string[];
  hobbies: string[];
}

interface StudentProfile {
  basicInfo: BasicInfo;
  contactInfo: ContactInfo;
  parentsInfo: ParentInfo;
  extracurricular: ExtracurricularInfo;
}

// Projects
interface TeamMember {
  name: string;
  role: 'leader' | 'member';
  avatar: string;
}

interface ProjectTimeline {
  phase: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in-progress' | 'pending';
}

interface Project extends Omit<Project, 'team' | 'timeline'> {
  key: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'in-progress' | 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  instructor: string;
  resources?: string[];
  timeline?: ProjectTimeline[];
  team?: TeamMember[];
  description?: string;
  attachments?: string[];
}

// Remarks/Complaints
interface ComplaintResponse {
  responder: string;
  role: string;
  date: string;
  comment: string;
  status: 'pending' | 'in-review' | 'resolved' | 'rejected';
}

interface Complaint {
  key: string;
  subject: string;
  description: string;
  date: string;
  status: 'pending' | 'in-review' | 'resolved' | 'rejected';
  type: 'academic' | 'administrative' | 'technical' | 'other';
  priority: 'high' | 'medium' | 'low';
  responses?: ComplaintResponse[];
  attachments?: string[];
}

// Export all interfaces
export {
  User,
  LoginFormValues,
  SubjectRecord,
  AttendanceRecord,
  AcademicStats,
  Project,
  Exam,
  ExamResult,
  ExamStats,
  FeeDetail,
  PaymentMethod,
  BasicInfo,
  ContactInfo,
  ParentInfo,
  ExtracurricularInfo,
  StudentProfile,
  TeamMember,
  ProjectTimeline,
  Complaint,
  ComplaintResponse,
};