import React, { useEffect, useState } from 'react'
import { ICatalogue } from '../utilities/interfaces/catalogue.interface'
import { formatRequestDate, hashRequestHeader } from '../utilities/helpers'
import { useQuery } from '@tanstack/react-query'

const Catalogue = () => {

    const { data, isLoading, error } = useQuery<Array<ICatalogue>>({
        queryFn: () => {
            const path = 'items'
            const date = formatRequestDate()
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNdW5lcm8iLCJleHAiOjE3MDUxODI5NDMsInR5cGUiOiJBdXRob3JpemF0aW9uVG9rZW4iLCJjcmVhdGlvbkRhdGUiOjE3MDUwOTY1NDMsInVzZXJJZCI6MTEzLCJ2ZXJzaW9uIjoxfQ.0fsBbbFFlxeiqYVrEo2zrvOUuLZ7AR5fDu2RDfVzC6U'

            const signature = path + 'GET' + date + token;
            const secret = 'coding_challenge_1'

            const signatureHeader = hashRequestHeader(signature, secret)

            return fetch(`https://staging.giftlov.com/api/Base/${path}`, {
                headers: {
                    'X-GIFTLOV-DATE': date,
                    'Accept': 'application/json',
                    'signature': signatureHeader,
                    'Authorization': token
                }
            })
                .then((res) => res.json())
                .then((data) => data.items)
        },
        queryKey: ['catalogue'],
    });

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    if (error) {
        return (
            <p>Error</p>
        )
    }

    return (
        <div>
            <h1>Catalogue</h1>
            {data?.map((item) => (
                <div key={item.id}>
                    {item.brand}
                </div>
            ))}
        </div>
    )
}

export default Catalogue