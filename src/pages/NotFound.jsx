import React from 'react'
import PageTitle from "../services/PageTitle";

const NotFound = () => {
  return (
    <div className="notfound-pageA">
      <PageTitle title="404 頁面不存在" />
      <div className="notfound-contentA">
        <div className="notfound-titleA">404</div>
        <div className="notfound-subtitleA">PAGE NOT FOUND</div>
        <div><a href="/" className="notfound-subtitleA">BACK TO HOME</a></div>
      </div>
    </div>
  )
}

export default NotFound
