interface Address {
  houseNumber: number;
  streetName: string;
  city: string;
  zipcode: number;
}
export class CreateUserDto {
  lastname: string;
  firstname: string;
  address: Address;
  telephone: string;
  mail: string;
  hashedPassword: string;
  role: string;
}
