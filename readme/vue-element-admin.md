## 1.介绍

[vue-element-admin](http://panjiachen.github.io/vue-element-admin) 是一个后台前端解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现。它使用了最新的前端技术栈，内置了 i18 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。

- 集成方案: [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- 基础模板: [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)
- 桌面终端: [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)
- Typescript 版: [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (鸣谢: [@Armour](https://github.com/Armour))
- Others: [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)



![1589003126447](D:\前端备课\15.VUE\readme\assets/1589003126447.png)



## 2.基本路由和侧边栏

这里的路由分为两种，`constantRoutes` 和 `asyncRoutes`。

**constantRoutes：** 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。

**asyncRoutes：** 代表那些需求动态判断权限并通过 `addRoutes` 动态添加的页面。

### 2.1 路由配置

src/router/index.js

```javascript
// constantRouterMap：主要是通用部分，每个用户都有的页面
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


// asyncRouterMap：需要进行权限过滤的页面
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin','editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  }
]
```

### 2.2 路由菜单显示

src\layout\components\Sidebar\index.vue

```javascript
computed: {
    ...mapGetters([
      'sidebar',
      'permission_routes',
    ]),
}
    
<!--遍历vuex中的权限路由，生成对应的菜单-->
<sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />

# 注意:这里将路由信息保存到了vuex，后面会说到，详见 src\store\modules\permission.js
```

## 2.3 登录和权限路由

登录：当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个**token**，拿到token之后（我会将这个token存贮到cookie中，保证刷新页面后能记住用户登录状态），前端会根据token再去拉取一个 **user_info** 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。

权限验证：通过token获取用户对应的 **role**，动态根据用户的 role 算出其对应有权限的路由，通过 **router.addRoutes** 动态挂载这些路由。

### 2.3.1 用户登录功能

src\views\login\index.vue

```javascript
handleLogin() {
    this.$refs.loginForm.validate(valid => {
        if (valid) {
            this.loading = true
            // 1.调用vuex提供的登录方法
            this.$store.dispatch('user/login', this.loginForm).then(() => {
                this.$router.push({ path: this.redirect || '/' })
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        } else {
            console.log('error submit!!')
            return false
        }
    })
}
```

src\store\modules\user.js

```javascript
const actions = {
  // 2.用户登录的方法
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 3.调用api/user中的login方法登录
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // 4.保存后台返回的token信息
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  .....
}
```

mock\user.js

```javascript

//后台给前台返回的tocken信息
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

//用户登录后给前台返回的用户信息
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // 用户登录接口
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // 获取用户信息接口
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // 用户退出登录接口
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
```

登录成功后，服务端会返回一个 **token**（该token的是一个能唯一标示用户身份的一个key），之后我们将token存储在本地cookie之中，这样下次打开页面或者刷新页面的时候能记住用户的登录状态，不用再去登录页面重新登录了。

### 2.3.2 权限路由生成

思路：在路由跳转的时候，获取用户基本信息，根据用户的角色信息和router/index.js中配置的asyncRoutes生成权限路由，把对应的路由信息保存到vuex，然后从vuex获取数据显示菜单



src\permission.js

```javascript
// 路由跳转之前，获取当前登录用户信息，动态加载用户角色对应的路由
router.beforeEach(async(to, from, next) => {
  // 全局的NProgress开始工作
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 获取用户tocken
  const hasToken = getToken()
  // 如果用户已经登录了
  if (hasToken) {
    // 不能再访问登录页面，跳转首页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      // 如果已经获取过用户信息了，直接放行
      if (hasGetUserInfo) {
        next()
      } else {
        // 如果没有获取过用户信息，调用vuex的user/getInfo获取用户信息
        try {
          const { roles } = await store.dispatch('user/getInfo')
          // 获取用户对应的权限菜单(这里通过vuex保存用户菜单信息，router.addRoutes没有意义)
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          // replace: true 确保导航不会有历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 如果有错，重置tocken并且来到登录页面
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有tocken
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单中直接放行
      next()
    } else {
      // 不在白名单中来到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
```

src\store\modules\user.js

```javascript
// 获取用户信息的方法
getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
            const { data } = response

            if (!data) {
                reject('Verification failed, please Login again.')
            }

            const { roles, name, avatar, introduction } = data

            if (!roles || roles.length <= 0) {
                reject('getInfo: roles must be a non-null array!')
            }

            commit('SET_ROLES', roles)
            commit('SET_NAME', name)
            commit('SET_AVATAR', avatar)
            commit('SET_INTRODUCTION', introduction)
            
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
},
```

src\store\modules\permission.js

```javascript
//用户路由菜单
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * 判断该用户对应的角色有没有指定的路由
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * 根据用户对应的角色过滤对应的路由
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  // 将用户对应的路由信息保存到vuex以便页面显示
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  //根据用户角色生成路由的方法
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

### 2.3.3 权限路由显示

src\layout\components\Sidebar\index.vue

```javascript
computed: {
    ...mapGetters([
      'sidebar',
      'permission_routes',
    ]),
}
    
<!--遍历vuex中的权限路由，生成对应的菜单-->
<sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
```

## 2.4 用户登录页面显示内容的控制

### 2.4.1 v-if控制内容

src\utils\permission.js

```javascript
import store from '@/store'

/**
 * 检测当前登录用户是否含有指定的角色，在页面使用，用于根据当前登录用户的角色显示不同的页面
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
```

### 2.4.1 v-permission显示内容

主要内容在：src\directive目录下，自定义指令完成

### 2.4.3 v-if和v-permission的使用

```html
<span v-permission="['admin']" class="permission-alert">
    Only
    <el-tag class="permission-tag" size="small">admin</el-tag> can see this
</span>
```

在一些情况下，使用v-permission会没有效果，比如在Element-UI的tab组件、el-table-column组件或者其他场景中，此时我们只能使用v-if

```html
<el-tab-pane v-if="checkPermission(['admin'])" label="Admin">
    Admin can see this
</el-tab-pane>
```

