import fs from 'fs'
import { parse } from 'csv-parse/sync'

// Read the CSV file
const csvFilePath = 'restaurants.csv'
const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' })

// Parse the CSV data
const restaurants = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  cast: (value, context) => {
    if (context.column === 'rating') {
      return parseFloat(value)
    }
    return value
  }
})

console.log('Parsed restaurant data:')
console.log(restaurants)

// Example search function
function searchRestaurants(location, cuisine, minRating) {
  return restaurants.filter(restaurant => 
    (location === '' || restaurant.location.toLowerCase().includes(location.toLowerCase())) &&
    (cuisine === '' || restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase())) &&
    restaurant.rating >= minRating
  )
}

// Example searches
console.log('\nSearch results for New York restaurants:')
console.log(searchRestaurants('New York', '', 0))

console.log('\nSearch results for Italian restaurants with rating 4.0 or higher:')
console.log(searchRestaurants('', 'Italian', 4.0))

console.log('\nSearch results for American restaurants in Miami:')
console.log(searchRestaurants('Miami', 'American', 0))