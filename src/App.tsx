import React, { Suspense } from 'react'
import { Routes, Route } from "react-router-dom";
import Loadable from 'react-loadable'

import MainLayout from './layouts/MainLayout';

import Loading from './components/Loading';

import Home from './pages/Home'

import './scss/app.scss'

// React Lazy import for optimization
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'))
// const NotFoundBlock = React.lazy(() => import(/* webpackChunkName: "NotFoundBlock" */'./components/NotFoundBlock'))
const NotFoundBlock = Loadable({
  loader: () => import(/* webpackChunkName: "NotFoundBlock" */'./components/NotFoundBlock'),
  loading: () => <Loading />
})


function App() {
  // В fullpizza мы передаем ссылку /pizza/ - статическая, а после :id - это динамическая ссылка, она может изменятся
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='cart' element={<Suspense fallback={<Loading />}><Cart /></Suspense>} />
        <Route path='pizza/:id' element={<Suspense fallback={<Loading />}><FullPizza /></Suspense>} />
        <Route path='*' element={<Suspense fallback={<Loading />}><NotFoundBlock /></Suspense>} />
        {/* Если переходим по не существующему адресу и его нету во всех роутах выше то вывести компонент notfound */}
      </Route>
    </Routes>
  )
}

export default App

// Outlet версия и другой кусок в layouts/MainLayout.jsx
  // <Routes>
  // <Route path='/' element={<MainLayout />}>
  //   <Route path='' element={<Home />} />
  //   <Route path='cart' element={<Cart />} />
  //   <Route path='pizza/:id' element={<FullPizza />} />
  //   <Route path='*' element={<NotFoundBlock />} />
  //   {/* Если переходим по не существующему адресу и его нету во всех роутах выше то вывести компонент notfound */}
  // </Route>


// function App() {
//   // В fullpizza мы передаем ссылку /pizza/ - статическая, а после :id - это динамическая ссылка, она может изменятся
//   return (
//     <div className='wrapper'>
//       <Header />
//       <div className='content'>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/cart' element={<Suspense fallback={<div>Идёт загрузка...</div>}><Cart /></Suspense>} />
//           <Route path='/pizza/:id' element={<Suspense fallback={<div>Идёт загрузка...</div>}><FullPizza /></Suspense>} />
//           <Route path='*' element={<Suspense fallback={<div>Идёт загрузка...</div>}><NotFoundBlock /></Suspense>} />
//           {/* Если переходим по не существующему адресу и его нету во всех роутах выше то вывести компонент notfound */}
//         </Routes>
//       </div >
//     </div >
//   )
// }