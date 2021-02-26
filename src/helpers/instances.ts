import { IUserStore, IShopStore } from 'src/types';

export const UserInstance: IUserStore.User = {
  id: 0,
  name: '',
  address: '',
  mobile_phone: '',
}

export const OrderInstance: IShopStore.Order = {
  id: 0,
  customer: UserInstance,
  products: [],
  shipping_address: '',
  status: 'processing',
  total_products: 0,
  tax: 0
}

export const ProductInstance: IShopStore.Product = {
  id: 0,
  title: '',
  sell_price: 0,
  category: {
    id: 0,
    tag: '',
    title: '',
  },
  image: {
    id: 0,
    paths: {
      lg: 'images/default.png',
      md: 'images/default.png',
      sm: 'images/default.png',
      xl: 'images/default.png',
      xs: 'images/default.png'
    },
    title: '',
    tags: []
  },
  owner: UserInstance,
  rating_average: 0,
  stock_qty: 0,
  sold: 0
}