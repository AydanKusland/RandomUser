import React, { useState, useEffect } from 'react'
import {
	FaEnvelopeOpen,
	FaUser,
	FaCalendarTimes,
	FaMap,
	FaPhone,
	FaLock
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
	const [loading, setLoading] = useState(false)
	const [person, setPerson] = useState(null)
	const [title, setTitle] = useState('name')
	const [value, setValue] = useState('random person')

	const handleValue = e => {
		if (e.target.classList.contains('icon')) {
			const newTitle = e.target.dataset.label
			setTitle(newTitle)
			setValue(person[newTitle])
		}
	}

	const getPerson = async () => {
		setLoading(true)
		const resp = await fetch(url)
		const { results } = await resp.json()

		const {
			name: { title, first, last },
			email,
			phone,
			dob: { age },
			location: {
				street: { name: str, number }
			},
			login: { password },
			picture: { medium: image }
		} = results[0]

		setPerson(prev => {
			const newPerson = {
				name: `${title} ${first} ${last}`,
				email,
				age,
				street: `${str} , ${number}`,
				phone,
				password,
				image
			}
			setValue(newPerson.name)
			return newPerson
		})
		setLoading(false)
		setTitle('name')
	}

	useEffect(() => {
		getPerson()
	}, [])

	return (
		<main>
			<div className='block bcg-black'></div>
			<div className='block'>
				<div className='container'>
					<img
						src={person?.image || defaultImage}
						alt='random user'
						className='user-img'
					/>
					<p className='user-title'>my {title} is</p>
					<p className='user-value'>{value}</p>
					<div className='values-list'>
						<button
							className='icon'
							data-label='name'
							onMouseOver={handleValue}
						>
							<FaUser />
						</button>
						<button
							className='icon'
							data-label='email'
							onMouseOver={handleValue}
						>
							<FaEnvelopeOpen />
						</button>
						<button className='icon' data-label='age' onMouseOver={handleValue}>
							<FaCalendarTimes />
						</button>
						<button
							className='icon'
							data-label='street'
							onMouseOver={handleValue}
						>
							<FaMap />
						</button>
						<button
							className='icon'
							data-label='phone'
							onMouseOver={handleValue}
						>
							<FaPhone />
						</button>
						<button
							className='icon'
							data-label='password'
							onMouseOver={handleValue}
						>
							<FaLock />
						</button>
					</div>
					<button className='btn' onClick={getPerson}>
						{loading ? 'loading...' : 'GET another random user'}
					</button>
				</div>
			</div>
		</main>
	)
}

export default App
