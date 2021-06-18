import {Route} from '../app/components/table/common/interfaces/route.interface';

export const routesMock: Route[] = [
  {
    uuid: generateUUID(),
    address: '0.0.0.0',
    mask: '0',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: generateUUID(),
    address: '10.1.30.0',
    mask: '24',
    gateway: '0.0.0.0',
    interface: 'Гостевая сеть',
  },
  {
    uuid: generateUUID(),
    address: '192.168.1.0',
    mask: '24',
    gateway: '0.0.0.0',
    interface: 'Домашняя сеть',
  },
  {
    uuid: generateUUID(),
    address: '193.0.174.0',
    mask: '24',
    gateway: '0.0.0.0',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: generateUUID(),
    address: '193.0.175.0',
    mask: '25',
    gateway: '193.0.174.10',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: generateUUID(),
    address: '193.0.175.22',
    mask: '32',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet',
  },
];

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
