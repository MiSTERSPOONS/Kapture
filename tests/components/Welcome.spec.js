import React from 'react';
import sinon, { stub } from 'sinon';
import { Provider } from 'react-redux'
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
Enzyme.configure({ adapter: new Adapter() });

import { Welcome } from '../../client/components/Welcome.js';
// import store from '../../client/store';
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

const didMount = sinon.spy()

describe.only('<Welcome />', () => {
  let wrapper;
  let getMe = stub();
  beforeEach(() => {
    wrapper = shallow(<Welcome getMe={getMe}/>);
    wrapper.componentDidMount = didMount
  })

  it('Calls getMe once', () => {
    expect(getMe.calledOnce).to.equal(true)
  });

  it('<h1> equals Welcome to Kapture', () => {
    // const student = mockItem();
    expect(wrapper.find('h1').text()).to.equal('Welcome to Kapture')
  });

  it('2 Links to be rendered', () => {
    // const student = mockItem();
    expect(wrapper.find('Link').length).to.equal(2)
  });

  it('1 logo to be rendered', () => {
    // const student = mockItem();
    expect(wrapper.find('img').length).to.equal(1)
  });
  // it('it renders one component', () => {
  // expect(wrapper.find(Welcome).contains('Welcome to Kapture')).to.equal(true);
  // });

  // it('renders a check mark when complete', () => {
  //   const item = mockItem({ complete: true });
  //   const wrapper = shallow(<ToDoItem item={item} />);
  //   expect(wrapper.find('.item-mark').text()).to.equal('✓');
  // });

  // it('renders a bullet when not complete', () => {
  //   const item = mockItem({ complete: false });
  //   const wrapper = shallow(<ToDoItem item={item} />);
  //   expect(wrapper.find('.item-mark').text()).to.equal('•');
  // });
  // it('calls onCompleteChange handler with the right arguments when clicked', () => {
  //   const spy = sinon.spy();
  //   const item = mockItem();
  //   const wrapper = shallow(<ToDoItem item={item} onCompleteChange={spy} />);
  //   wrapper.find('.item-button').simulate('click');
  //   expect(spy.calledOnce).to.be.true;
  //   expect(spy.calledWith(item, false)).to.be.true;
  // });
});