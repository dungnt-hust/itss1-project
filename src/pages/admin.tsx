import { DeleteOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Modal, Pagination } from 'antd'
import { useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { axiosInstance } from '~/helpers/axiosInstance'

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState()
  const [tab, settab] = useState('')
  const [name, setName] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { search } = useLocation()
  const tabRef = useMemo(() => new URLSearchParams(search).get('tab'), [search])

  const TabComponent = ({ tab, title }: { tab: string; title: string }) => {
    return (
      <div
        className='h-12 w-full flex items-center justify-center rounded-lg cursor-pointer bg-white font-bold text-xl border-[2px] border-solid border-gray-800 mb-6'
        style={{ borderColor: tab == tabRef ? '#db2323' : '' }}
        onClick={() => {
          setSearchParams({ tab })
          settab(tab)
        }}
      >
        {title}
      </div>
    )
  }

  const { data: dataDetails }: any = useQuery({
    queryKey: ['repoDataID', id],
    queryFn: () =>
      axiosInstance.request({
        method: 'GET',
        url: `/teacher/${id}`,
      }),
  })

  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData', name, currentPage, tab],
    queryFn: () =>
      axiosInstance.request({
        method: 'GET',
        url: tab == '1' ? '/teacher' : tab == '2' ? '/teacher' : '/teacher',
        params: {
          name,
          page: currentPage,
          limit: 5,
        },
      }),
  })

  return (
    <div className='border border-solid border-gray-800 w-full max-w-7xl mx-auto my-10 flex flex-col'>
      <div className='h-20 flex items-center justify-between px-8 border-b border-solid border-gray-800 w-full'>
        <div className='admin-logo w-52 h-14 bg-gray-500 flex items-center justify-center border border-solid border-gray-800'>
          <div className='font-medium text-lg text-purple-700'>
            SagaSuybg <span className='text-red-600'>Admin</span>
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <div>ログアウト</div>
          <div className='bg-blue-300 w-12 h-12 rounded-full'></div>
        </div>
      </div>
      <div className='flex-1 grid-cols-[1fr_5fr] grid'>
        <div className='border-r border-solid border-gray-800 bg-gray-300 py-10 px-4'>
          <TabComponent tab={'1'} title={'教師管理'} />
          <TabComponent tab={'2'} title={'学生管理'} />
          <TabComponent tab={'3'} title={'統計'} />
        </div>
        <div className='py-6 px-5'>
          <input
            type='text'
            className='mx-10 h-8 rounded-lg bg-blue-200 w-7/12 pl-3 text-lg placeholder:text-black'
            placeholder='名前を入力して探す'
          />
          <table className='w-full mt-6'>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>点</th>
              <th>様子</th>
              <th>機能</th>
            </tr>
            {data?.data?.data.map((value: any, idex: any) => (
              <tr key={idex}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.star_average}</td>
                <td>???</td>
                <td>
                  <div className='flex gap-2 justify-center items-center'>
                    <DeleteOutlined />
                    <i className='fa-solid fa-lock'></i>
                    <i
                      className='fa-solid fa-eye cursor-pointer'
                      onClick={() => {
                        setId(value.id)
                        setIsModalOpen(true)
                      }}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </table>
          <div className='flex justify-center items-center my-6'>
            <Pagination
              current={currentPage}
              pageSize={5}
              onChange={(page, pageSize) => setCurrentPage(page)}
              total={+data?.data.pagination?.totalPages * 5}
              className='mx-auto'
            />
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} footer={[]} closeIcon={<></>} onCancel={() => setIsModalOpen(false)}>
        <div className='w-[35rem] bg-white p-8'>
          <div className='w-14 h-14 bg-gray-600 rounded-full'></div>
          <div className='my-4 text-lg font-bold'>ID:{dataDetails?.data?.data?.id}</div>
          <div className='my-4 text-lg font-bold'>名前:{dataDetails?.data?.data?.name}</div>
          <div className='my-4 text-lg font-bold'>SCORE:{dataDetails?.data?.data?.id}</div>
          <div className='my-4 text-lg font-bold'>電話番:{dataDetails?.data?.data?.phone}</div>
          <div className='my-4 text-lg font-bold'>メール:{dataDetails?.data?.data?.email}</div>
          <div className='my-4 text-lg font-bold'>様子：ブロックされました</div>
          <div className='my-4 text-lg font-bold'>アカウント作成日:{dataDetails?.data?.data?.createdAt??"30/06/2022"}</div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminPage
