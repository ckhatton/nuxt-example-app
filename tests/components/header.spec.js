import { setup, mount } from '@nuxt/test-utils-edge';
import Header from '@/components/Header.vue';

describe('Header component tests: ', async () => {
  await setup({
    // test context options
  });

  test('It is a Vue component', () => {
    const wrapper = mount(Header);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
})
