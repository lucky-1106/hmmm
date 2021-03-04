import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Menu,
  MenuItem,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Tag,
  DatePicker,
  Form,
  FormItem,
  Row,
  Col,
  Upload,
  Card,
  Container,
  Header,
  Aside,
  Avatar,
  Progress,
  Main,
  Link,
  MessageBox,
  Message,
  Cascader
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Progress)
Vue.use(Input)
Vue.use(Tag)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Avatar)
Vue.use(Main)
Vue.use(Link)
Vue.use(Cascader)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
