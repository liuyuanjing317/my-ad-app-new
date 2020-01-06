import Vue from 'vue'


import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
import { Search } from 'mint-ui';
Vue.component(Search.name, Search);


import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


import {
  TabContainer,
  TabContainerItem ,
  Tabbar,TabItem,Cell,Button,
  IndexList, IndexSection
} from 'mint-ui'

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Cell.name, Cell);
Vue.component(Button.name, Button);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);

/*
import { Lazyload } from 'mint-ui';
Vue.component(Lazyload.name, Lazyload);*/

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);






