import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';


type SignInDataType = {
  email: string,
  password: string
}

export default async function SignInRequest(request: NextApiRequest, response: NextApiResponse) {
  const data = JSON.parse(request.body);

  console.log(data)

  response.send({
    token: uuid(),
    user: {
      name: 'Qualquer',
      email: data.email,
      avatar: ''
    }
  })
}

