import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function main() {
  await mongoose.connect(config.db_url as string)

  app.listen(config.port, () => {
    console.log(`Bike Rental Reservation System Backend app listening on port ${config.port}`)
  })
}

main()