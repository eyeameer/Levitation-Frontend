interface languages{
  option:string;
  value:string;
}
export interface IFormData  {
    name: string;
    email: string;
    phone: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
    languages:languages[];
    files: File[];
    geolocationStatus: string;
  }
export interface GetFormData{
  _id:string
  name: string;
    email: string;
    phone: string;
    createdBy:string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
    languages:languages[];
    files: [{
      id?:string,
      name?:string
    }];
    createdAt:string;
    geolocationStatus: string;
}  