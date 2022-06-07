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
  telephone: number;
  mail: string;
  hashedPassword: string;
}
