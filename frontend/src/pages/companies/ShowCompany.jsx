import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/animated/Loader.jsx'
import { useSelector } from 'react-redux'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const ShowCompany = () => {
  const [company, setCompany] = useState({})
  const [owners, setOwners] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const [backbuttonLink, setBackbuttonLink] = useState('/companies')

  const referrer = new URLSearchParams(window.location.search).get('referrer')

  useEffect(() => {
    if (!referrer) {
      return
    }
    setBackbuttonLink(`/find?query=${referrer}`)
  }, [referrer])

  const { userId } = useSelector((state) => state)

  const [userIsMember, setUserIsMember] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${BACKEND_URL}/companies/${id}`)
      .then((response) => {
        setCompany(response.data)

        const ownerPromises = response.data.owners.map((owner) =>
          axios.get(`${BACKEND_URL}/users/user/${owner.userId}`),
        )

        Promise.all(ownerPromises)
          .then((responses) => {
            const ownersData = responses.map(
              (ownersResponse) => ownersResponse.data,
            )
            //
            setOwners(ownersData)
            setLoading(false)
          })
          .catch((error) => {
            console.log(error)
            setLoading(false)
          })
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [id])

  useEffect(() => {
    // check if current user is member of company, owner or admin or employee etc.
    axios
      .get(`${BACKEND_URL}/companies/${id}/${userId}/isMember`)
      .then((response) => {
        if (response.data.isMember === true) {
          setUserIsMember(true)
          return
        }
        setUserIsMember(false)
      })
      .catch((error) => {
        console.log(error)
        setUserIsMember(false)
      })
  }, [company, userId])

  //

  return (
    <Layout>
      <div className='p-5'>
        <BackButton destination={backbuttonLink} />
        <div className='relative mx-auto w-[320px]'>
          <img
            alt='profile'
            className='mx-auto mt-2 h-64 w-64 rounded-full object-cover'
            src={company.logoUrl ? `${BACKEND_URL}${company.logoUrl}` : ''}
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className='mx-auto mt-6 rounded-xl border border-purple-900 bg-violet-950/40 p-4 lg:w-9/12'>
            <table>
              <thead>
                <tr>
                  <th className='pb-2 text-left text-2xl' colSpan='2'>
                    About {company.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='pr-4 text-xl text-gray-500'>KVK</td>
                  <td>{company.kvkNumber}</td>
                </tr>
                <tr>
                  <td className='pr-4 text-xl text-gray-500'>Name</td>
                  <td>{company.name}</td>
                </tr>
                {userIsMember ? (
                  <tr>
                    <td className='pr-4 text-xl text-gray-500'>Email</td>
                    <td>{company.email}</td>
                  </tr>
                ) : null}
                {userIsMember ? (
                  <tr>
                    <td className='pr-4 text-xl text-gray-500'>Phone</td>
                    <td>{company.phone}</td>
                  </tr>
                ) : null}
                <tr>
                  <td className='pr-4 text-xl text-gray-500'>Start Year</td>
                  <td>{company.startYear}</td>
                </tr>
                {userIsMember ? (
                  <tr>
                    <td className='pr-4 text-xl text-gray-500'>Owners</td>
                    <td>
                      {owners
                        .map((owner) => `${owner.firstName} ${owner.lastName}`)
                        .join(', ')}
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <td className='pr-4 text-xl text-gray-500'>Create Time</td>
                  <td>{new Date(company.createdAt).toString()}</td>
                </tr>
                <tr>
                  <td className='pr-4 text-xl text-gray-500'>
                    Last Update Time
                  </td>
                  <td>{new Date(company.updatedAt).toString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ShowCompany
