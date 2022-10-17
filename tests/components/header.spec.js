import { mount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header component tests: ', async () => {
  test('It is a Vue component', () => {
    const wrapper = mount(Header);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('It renders my name', () => {
    const name = 'Christopher Hatton';
    const wrapper = mount(Header);
    expect(wrapper.html()).toContain(name);
  });
})
