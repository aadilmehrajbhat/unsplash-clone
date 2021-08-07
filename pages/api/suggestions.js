import Cors from 'cors';
import { initMiddleware } from '@utils/middlewares';
import { fetchUnsplashSearchSuggestions } from '@services/unsplash-api';

const cors = initMiddleware(
  Cors({
    origin: process.env.DOMAIN_URL,
    methods: ['GET'],
  }),
);

export default async function handler(req, res) {
  try {
    await cors(req, res);
    const suggestions = await fetchUnsplashSearchSuggestions();
    res.status(200).json(suggestions);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: 'Error while fetching the Unsplash search suggestions' });
  }
}
