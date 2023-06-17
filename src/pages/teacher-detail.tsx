import { CheckOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { useLocation } from 'react-router-dom'
import { axiosInstance } from '~/helpers/axiosInstance'
import Container from '~/layouts/components/Container'
import Star from '~/views/Star'

const TeacherDetail = () => {
  const { search } = useLocation()
  const idParams = search.slice(4)

  const { isLoading, error, data }: any = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axiosInstance.request({
        method: 'GET',
        url: `/teacher/${idParams}`,
      }),
  })
  return (
    <div className='min-h-screen w-full bg-blue-200'>
      <Container className='py-6 flex items-end justify-center bg-blue-200'>
        <div className='w-full rounded-2xl p-8 shadow-sm bg-white flex items-start justify-between gap-4'>
          <img className='w-36 h-36 object-cover rounded-full border border-solid border-gray-500' alt='' />
          <div className='w-[85%]'>
            <div className='flex flex-col gap-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <h1 className='font-semibold text-yellow-700 text-2xl'>家庭教師</h1>
                  <h1 className='font-semibold text-black text-2xl'>{data?.data?.data?.name}</h1>
                </div>
                <div className='cursor-pointer flex gap-1'>
                  <div>{data?.data?.data?.star_average}</div>
                  <Star />
                </div>
              </div>
              <div className='flex gap-2'>
                <EnvironmentOutlined className='text-purple-800 mt-1' />
                <div className='font-semibold text-purple-700'>{data?.data?.data?.address}</div>
              </div>
              <div className='flex justify-between '>
                <div>年齢:{data?.data?.data?.age} </div>
                <div>経験: {data?.data?.data?.experience}</div>
                <div>経験: {data?.data?.data?.gender}</div> {/** Gender */}
                <div>料金: {data?.data?.data?.price}VNĐ/45p</div>
              </div>
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-2 w-[40%]'>
                  <h1>Certi:</h1>
                  <div className='flex flex-wrap items-center gap-4'>
                    {data?.data?.data?.certificate1 !== '' ? (
                      <div className='bg-green-700 text-sm p-2 rounded text-white shadow-sm shadow-gray'>
                        {data?.data?.data?.certificate1}
                      </div>
                    ) : null}

                    {data?.data?.data?.certificate2 !== '' ? (
                      <div className='bg-purple-700 text-sm p-2 rounded text-white shadow-sm shadow-gray'>
                        {data?.data?.data?.certificate2}
                      </div>
                    ) : null}

                    {data?.data?.data?.certificate3 !== '' ? (
                      <div className='bg-teal-700 text-sm p-2 rounded text-white shadow-sm shadow-gray'>
                        {data?.data?.data?.certificate3}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>料金: {data?.data?.data?.price}VNĐ/45p</div>
              </div>
              <div className='flex items-start gap-6'>
                <h1>Certi:</h1>
                <ul className='list-disc'>
                  <li className='flex items-center gap-2 w-full justify-between'>
                    {data?.data?.data?.certificate1} <CheckOutlined className='text-green-600' />
                  </li>
                  <li className='flex items-center gap-2 w-full justify-between'>
                    {data?.data?.data?.certificate2} <CheckOutlined className='text-green-600' />
                  </li>
                  <li className='flex items-center gap-2 w-full justify-between'>
                    {data?.data?.data?.certificate3} <CheckOutlined className='text-green-600' />
                  </li>
                </ul>
              </div>
              <div className='w-full'>
                <span>{data?.data?.data?.detail}</span>
              </div>

              <div className='flex items-center justify-between gap-6'>
                <Button size='large' className='w-fit bg-blue-600 text-white !px-10'>
                  ABC
                </Button>
                <Button size='large' className='w-fit bg-blue-600 text-white !px-10'>
                  ABC
                </Button>
                <Button size='large' className='w-fit bg-blue-600 text-white !px-10'>
                  ABC
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TeacherDetail
