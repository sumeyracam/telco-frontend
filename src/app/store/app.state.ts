import { CustomerStoreState } from './customer/customer.state';

export interface AppStoreState {
  customer: CustomerStoreState;
  // customerToRegister: CustomerToRegister;
}
