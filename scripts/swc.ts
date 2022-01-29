import { read, mapBasepath, create } from './libs'

read('src').then(mapBasepath).then(create)
