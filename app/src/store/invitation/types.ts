export interface Invitation {
  senderUser: {
    userId: number;
    username: string;
    phone: string;
    email: string;
    info: string;
    logo: string;
    role: string;
  };
  receiverUserEmail: string;
  receiverUserRole: string;
  receiverUser: {
    logo: string;
  };
  token: string;
}
