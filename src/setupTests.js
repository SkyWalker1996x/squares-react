import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-enzyme';
/*import Adapter from 'enzyme-adapter-react-16';*/
/*import toJson from 'enzyme-to-json'*/

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

console.error = (message) => {
  throw new Error(message);
};
