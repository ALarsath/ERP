export interface PointBreakdown {
  category: string;
  points: number;
  maxPoints: number;
}

export interface PointsData {
  totalPoints: number;
  maxTotalPoints: number;
  currentPoints: number;
  maxCurrentPoints: number;
  totalPointsBreakdown: PointBreakdown[];
  currentPointsBreakdown: PointBreakdown[];
}

export interface Project {
  title: string;
  subject: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'pending' | 'not-started';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  instructor: string;
}

export interface Activity {
  date: string;
  time: string;
  title: string;
  score: string;
  type: 'success' | 'processing' | 'warning';
  subject: string;
  icon: React.ReactNode;
}
