import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import View from '../view/View'
import { useView } from '../../hook/views'
import NewComment from './NewComment'
import CommentList from './CommentList'

export default function Comments() {
const {id} = useParams()
// console.log(params);
const {view, isLoading}=useView(id)
if(isLoading) return 'Loading...'

  return (
    <Box align='center' pt='50'>
      <View view={view}/>
      <NewComment view={view}/>
      <CommentList view={view}/>
      </Box>
  )
}
