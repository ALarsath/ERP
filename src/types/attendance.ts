export interface SubjectAttendance {
  subject: string;
  teacher: string;
  present: number;
  absent: number;
  late: number;
  total: number;
  totalClasses: number;
  presentClasses: number;
  absentClasses: number;
  lateClasses: number;
  nextClass: string;
}

export interface Warning {
  date: string;
  reason: string;
  issuedBy: string;
  severity: 'high' | 'medium' | 'low';
}

export interface AttendanceOverall {
  present: number;
  absent: number;
  late: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  streak: number;
  bestStreak: number;
  attendanceGoal: number;
}
