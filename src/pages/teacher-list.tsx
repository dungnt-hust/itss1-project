import {
  CaretDownOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneFilled,
  SearchOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Dropdown, Form, Input, MenuProps, Pagination, Select } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from '~/helpers/axiosInstance'
import Star from '~/views/Star'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <div>名前 A-Z</div>,
  },
  {
    key: '2',
    label: <div>料金</div>,
  },
  {
    key: '3',
    label: <div>星の平均</div>,
  },
  {
    key: '4',
    label: <div>レベル</div>,
  },
]

const TeacherListPage = () => {
  const [name, setName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [value, setValue] = useState<any>({})

  const [form] = Form.useForm()

  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData', name, currentPage, value],
    queryFn: () =>
      axiosInstance.request({
        method: 'GET',
        url: '/teacher',
        params: {
          name,
          page: currentPage,
          limit: 3,
          level: value.level,
          experience: value.experience,
          low_age: value.low_age,
          high_age: value.high_age,
          low_price: value.low_price,
          high_price: value.high_price,
          gender: value.gender,
        },
      }),
  })

  const handleFinishForm = async () => {
    setValue(form.getFieldsValue())
  }

  return (
    <div className='bg-blue-200 p-10 flex-1'>
      <div className='mx-auto max-w-7xl grid grid-cols-[2fr_1fr] gap-4'>
        <div className='shadow-2xl p-6 bg-white'>
          <div className='flex justify-between items-center mb-6'>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <div className='h-7 flex rounded-lg border border-solid items-center gap-2 px-2 cursor-pointer'>
                  <SortAscendingOutlined /> <span>選別</span>
                </div>
              </a>
            </Dropdown>
            <div className='relative'>
              <SearchOutlined className='absolute right-1 top-[1px] text-xl text-gray-600' />
              <input
                value={name}
                onChange={(el) => setName(el.target.value)}
                type='text'
                className='w-96 text-black bg-transparent border focus-visible:outline-none border-solid border-gray-500 focus:border-nature-500 focus-visible:border-blue-500 rounded mb-2 py-1 pl-4'
              />
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            {!error &&
              data?.data?.data.map((value: any, idex: any) => (
                <Link
                  to={{
                    pathname: '/teacher-detail',
                    search: `?id=${value.id}`,
                  }}
                >
                  <div
                    key={idex}
                    className='border border-solid gap-5 border-gray-700 p-5 rounded-3xl grid grid-cols-[10rem_1fr]'
                  >
                    <div className='flex justify-center items-start'>
                      <img
                        src={value.avatar}
                        className='w-36 h-36 object-cover rounded-full border border-solid border-gray-500'
                        alt=''
                      />
                    </div>
                    <div>
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center justify-start text-xl gap-6'>
                          <div className='font-semibold text-yellow-700'>家庭教師</div>
                          <div className='font-semibold text-black'>{value.name}</div>
                        </div>
                        <div className='cursor-pointer flex gap-1'>
                          <div>{value.star_average}</div>
                          <Star />
                        </div>
                      </div>
                      <div className='flex my-2 gap-2'>
                        <EnvironmentOutlined className='text-purple-800 mt-1' />
                        <div className='text-sm text-purple-700'>{value.address}</div>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <div>年齢:{value.age} </div>
                        <div>経験: {value.experience}</div>
                        <div>料金: {value.price}VNĐ/45p</div>
                      </div>
                      <div className='my-2 flex gap-2'>
                        <PhoneFilled className='cursor-pointer rotate-90' />
                        <MailOutlined className='cursor-pointer' />
                      </div>
                      <div className='text-sm text-gray-700'>{value.detail}</div>
                    </div>
                  </div>
                </Link>
              ))}
            {+data?.data.pagination?.totalPages && (
              <Pagination
                current={currentPage}
                pageSize={3}
                onChange={(page, pageSize) => setCurrentPage(page)}
                total={+data?.data.pagination?.totalPages * 3}
                className='mx-auto'
              />
            )}
          </div>
        </div>
        <div className='shadow-2xl p-6 bg-white'>
          <Form autoComplete='off' form={form} onFinish={handleFinishForm} className='mb-1'>
            <Form.Item
              label='レベル'
              labelAlign='left'
              name='level'
              rules={[{ required: false, message: 'Please input your username!' }]}
            >
              <Select
                className='w-full'
                defaultValue={1}
                suffixIcon={<CaretDownOutlined className='text-black' />}
                options={[...Array(12)].map((value, idex) => ({ value: idex + 1, label: `${idex + 1}` }))}
              />
            </Form.Item>
            <Form.Item
              label='経験'
              labelAlign='left'
              name='experience'
              rules={[{ required: false, message: 'Please input your username!' }]}
            >
              <Select
                className='w-full'
                defaultValue={1}
                suffixIcon={<CaretDownOutlined className='text-black' />}
                options={[...Array(5)].map((value, idex) => ({ value: idex + 1, label: `${idex + 1}` }))}
              />
            </Form.Item>
            <div className='font-medium text-base mt-10'>料金</div>
            <Form.Item
              label='から'
              labelAlign='left'
              name='low_price'
              rules={[{ required: false, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='まで'
              labelAlign='left'
              name='high_price'
              rules={[{ required: false, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='性別'
              labelAlign='left'
              name='gender'
              rules={[{ required: false, message: 'Please input your username!' }]}
            >
              <Select
                defaultValue='lucy'
                suffixIcon={<CaretDownOutlined className='text-black' />}
                options={[
                  { value: '1', label: '女性' },
                  { value: '2', label: '男性' },
                  { value: '3', label: '他の' },
                ]}
              />
            </Form.Item>
            <div className='font-medium text-base mt-10'>年齢</div>
            <div className='flex grid-cols-2 gap-4'>
              <Form.Item
                label='から'
                labelAlign='left'
                name='low_age'
                rules={[{ required: false, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className='flex-row'
                label='まで'
                labelAlign='left'
                name='high_age'
                rules={[{ required: false, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item className='mt-10'>
              <Button type='primary' className='bg-blue-500 w-full' htmlType='submit'>
                フィールド
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default TeacherListPage
