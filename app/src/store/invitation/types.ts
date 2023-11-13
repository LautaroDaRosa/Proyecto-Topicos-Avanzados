export interface Invitation {
  inviteSender: {
    userId: number;
    username: string;
    phone: string;
    email: string;
    info: string;
    logo: string;
    role: string;
  };
  invteReceiver: string;
}
