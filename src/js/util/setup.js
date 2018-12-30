import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

chai.use(chaiEnzyme());

configure({ adapter: new Adapter() });

export const expect = chai.expect;
