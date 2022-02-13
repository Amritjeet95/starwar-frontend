import React, { useState, useCallback, useEffect } from 'react';
import { AxiosService } from '../services/AxiosService';
import Typewriter from 'typewriter-effect';
import "./People.css"



export const People = () => {

    const [peopleList, setPeopleList] = useState([]);
    const [peopleDetails, setPeopleDetails] = useState([]);
    const axiosService = new AxiosService();

    const typeWritterEffect = (inputString) => {
        return <Typewriter
            options={{
                strings: inputString,
                autoStart: true,
                loop: false,
                cursor: null
            }}
        />
    }

    const getPeopleList = useCallback(() => {
        axiosService.getPeopleList().then(response => {
            if (response && response.status === 200 && response.data) {
                setPeopleList(response.data);
                setPeopleDetails(response.data[0]);

            } else {
                return;
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const getPeopleDetailsById = useCallback((id) => {
        axiosService.getPeopleDetailsById(id).then(response => {
            if (response && response.status === 200 && response.data) {
                setPeopleDetails(response.data);
            } else {
                return;
            }
        }).catch(err => {
            console.log(err);
        })
    })

    useEffect(() => {
        getPeopleList();
    }, [getPeopleList])


    return <>
        <div className="people-container">
            <div className="people-box-wrapper">
                <div className="people-list-wrapper">
                    {
                        peopleList.map(people => (
                            <div className={`people-listitem ${peopleDetails.id === people.id ? 'selectedPeople' : ''}`} key={people.id} onClick={e => getPeopleDetailsById(people.id)}>
                                {people.name}
                            </div>
                        ))
                    }
                </div>
                <div className={`people-details-wrapper`}>
                    <div className="people-avatar">
                        <img className="avatar" src={`/images/people/${peopleDetails.id}.png`} alt={peopleDetails.name} />
                    </div>
                    <div className='people-details'>
                        <div className="details-wrapper">
                            <div className="detail-label label">Basic Info</div>
                            <div className="value-pair w-100">
                                <div className="label">Name</div>
                                <div className="value">{typeWritterEffect(peopleDetails?.name)}</div>
                            </div>
                            <div className="value-pair">
                                <div className="label">Gender</div>
                                <div className="value">{typeWritterEffect(peopleDetails?.gender)}</div>
                            </div>
                            <div className="value-pair">
                                <div className="label">Height</div>
                                <div className="value">{typeWritterEffect(peopleDetails?.height + 'cm')}</div>
                            </div>
                            <div className="value-pair">
                                <div className="label">Mass</div>
                                <div className="value">{typeWritterEffect(peopleDetails?.mass + 'lbs')}</div>
                            </div>
                            <div className="value-pair">
                                <div className="label">Hair Color</div>
                                <div className="value">{typeWritterEffect(peopleDetails?.hair_color)}</div>
                            </div>
                            <div className="value-pair">
                                <div className="label">Skin Color</div>
                                <div className="value">{typeWritterEffect(peopleDetails?.skin_color)}</div>
                            </div>

                        </div>
                        <div className="details-wrapper">
                            <div className="detail-label label">Home Planet</div>
                            <div className="value-pair w-100">
                                <div className="label planet-label">Title</div>
                                <div className="value planet-value">{typeWritterEffect(peopleDetails?.homeworld?.title)}</div>
                            </div>
                            <div className="value-pair w-100">
                                <div className="label planet-label">Terrain</div>
                                <div className="value planet-value">{typeWritterEffect(peopleDetails?.homeworld?.terrain)}</div>
                            </div>
                            <div className="value-pair w-100">
                                <div className="label planet-label">Population</div>
                                <div className="value planet-value">{typeWritterEffect(peopleDetails?.homeworld?.population)}</div>
                            </div>
                        </div>
                        {
                            peopleDetails?.species?.length > 0 && <div className="details-wrapper">
                                <div className="detail-label label">Species</div>
                                {
                                    peopleDetails?.species.map(species => (
                                        <>
                                            <div className="value-pair w-100">
                                                <div className="label planet-label">Name</div>
                                                <div className="value planet-value">{typeWritterEffect(species?.name)}</div>
                                            </div>
                                            <div className="value-pair w-100">
                                                <div className="label planet-label">Average Lifespan</div>
                                                <div className="value planet-value">{typeWritterEffect(species?.average_lifespan)}</div>
                                            </div>
                                            <div className="value-pair w-100">
                                                <div className="label planet-label">Classification</div>
                                                <div className="value planet-value">{typeWritterEffect(species?.classification)}</div>
                                            </div>
                                            <div className="value-pair w-100">
                                                <div className="label planet-label">Language</div>
                                                <div className="value planet-value">{typeWritterEffect(species?.language)}</div>
                                            </div>
                                        </>
                                    ))
                                }

                            </div>

                        }
                        {
                            peopleDetails?.films?.length > 0 && <div className="details-wrapper film-details-wrapper">
                                <div className="detail-label label film-heading">Films</div>
                                <div className="film-list">
                                    {
                                        peopleDetails?.films.map(film => (
                                            <div className="film-card">
                                                <div className="film-title">{film?.title}</div>

                                                <div className="value-pair w-100">
                                                    <div className="label">Director</div>
                                                    <div className="value">{film?.director}</div>
                                                </div>
                                                <div className="value-pair w-100">
                                                    <div className="label">Producer</div>
                                                    <div className="value">{film?.producer}</div>
                                                </div>
                                                <div className="value-pair w-100">
                                                    <div className="label">Release Date</div>
                                                    <div className="value">{film?.release_date}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>

                        }
                    </div>

                </div>

            </div>
        </div>
    </>
}