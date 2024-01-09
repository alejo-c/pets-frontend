import { emptyAdopter } from '../types/adopter'
import { signal } from '@preact/signals-react'
import { messageAlert } from '../lib/sweetalerts'
import Icon from './Icon'
import Input from './Input'
import apiRequest from '../lib/axiosrequests'
import Pet from '../types/pet'
import { AxiosResponse } from 'axios'

const adopter = signal(emptyAdopter)

const handleChange = (e: any) => adopter.value = {
    ...adopter.value,
    [e.target.name]: e.target.value.trim()
}

const AdopterModal = ({ getData, pet }: { getData: () => void, pet: Pet }) => {

    const atResponse = (res: AxiosResponse<any, any>) => {
        const { type } = res.data
        if (type === 'success')
            document.getElementById('closeModalBtn')?.click()
        return res.data
    }

    const sendRequest = async (url: string, data: {}) => await apiRequest({
        method: 'POST', url, data
    }).then(atResponse).catch(err => messageAlert(err, 'error'))

    const registerAdoptionRequest = (data: any) => {
        adopter.value = data.created

        sendRequest('/adoption-requests/register', {
            adopter_id: adopter.value.id,
            pet_id: pet.id
        }).then(() =>
            messageAlert(`${adopter.value.name} successfully requested to adopt ${pet.name}`, 'success')
        ).then(getData)
    }

    const validate = () => {
        if (adopter.value.name === '')
            return messageAlert('Name is required', 'error')
        if (adopter.value.address === '')
            return messageAlert('Address is required', 'error')
        if (adopter.value.contact === '')
            return messageAlert('Contact is required', 'error')

        sendRequest('/adopters/register', {
            name: adopter.value.name,
            address: adopter.value.address,
            contact: adopter.value.contact
        }).then(registerAdoptionRequest)
    }

    return <>
        <div id='adoptersModal' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5>
                            <Icon icon='file-pen' style='me-2' />
                            Make an Adoption Request
                        </h5>
                    </div>
                    <div className='modal-body'>
                        <Input
                            type='text'
                            name='name'
                            icon={<i className='fa-solid fa-signature' />}
                            placeholder='Your name'
                            value={adopter.value.name}
                            onChange={handleChange}
                        />
                        <Input
                            type='text'
                            name='address'
                            icon={<i className='mx-1 fa-solid fa-location-dot' />}
                            value={adopter.value.address}
                            placeholder='Your Address'
                            onChange={handleChange}
                        />
                        <Input
                            type='text'
                            name='contact'
                            icon={<i className='ms-1 fa-solid fa-address-book' />}
                            placeholder='Your Contact'
                            value={adopter.value.contact}
                            onChange={handleChange}
                        />
                        <div className='d-grid col-6 mx-auto'>
                            <button
                                className='btn btn-success'
                                onClick={validate}
                            >
                                <i className='fa-solid fa-floppy-disk' /> Save
                            </button>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button
                            id='closeModalBtn'
                            type='button'
                            className='btn btn-secondary'
                            data-bs-dismiss='modal'
                            data-bd-target='#adoptersModal'
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AdopterModal