import { fetchUnsplashSearchSuggestions } from '@services/unsplash-api';

export default async function handler(req, res) {
  try {
    const suggestions = await fetchUnsplashSearchSuggestions();
    res.status(200).json(suggestions);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: 'Error while fetching the Unsplash search suggestions' });
  }
}
