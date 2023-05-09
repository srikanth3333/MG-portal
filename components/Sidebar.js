import Link from 'next/link'
import { HomeFilled, CloseOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";




function Sidebar({activeSidebar,setActiveSidebar,targetReached}) {

  const router = useRouter();

  let items = [
    {
        label: 'Agency',
        link: '/agency'
    },
  ];


  return (
    <div className="sidebar">
        <div className="card py-1 shadow-md">
            <div className="card-body">
                <div className="logo-box text-center">
                    {
                        targetReached == true ?
                        <div className="d-flex justify-content-end">
                            <CloseOutlined className="icon" onClick={() => setActiveSidebar(!activeSidebar)} />
                        </div> : null
                    }
                </div>
                <div className="list-items">
                        {
                            items.map((item,i) => (
                                <Link href={`${item.link}`} onClick={() => targetReached == true ? setActiveSidebar(false) : null} key={i} 
                                        className={router.pathname.includes(item.link) ? `a-active` : ''}>
                                    <div className={router.pathname.includes(item.link) ? `active d-flex list-item` : 'd-flex list-item text-center'}>
                                        <HomeFilled className="me-3" />
                                    </div>
                                </Link>
                            ))
                        }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar;