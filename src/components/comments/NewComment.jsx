import { Flex, Box, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hook/auth";
import { useAddComment } from "../../hook/comments";
import Avatar from "../profile/Avatar";

export default function NewComment({view}) {
    const {id: viewID} = view;
    const {user, isLoading: authLoading} = useAuth()
    const {register, handleSubmit, reset} = useForm()
    const {addComment, isLoading: commentLoading} = useAddComment({
        viewID,
        uid: user?.id,
    })

    function handleAddComment(data){
        addComment(data.text)
        reset()
    }

    if(authLoading) return 'Loading...'

  return (
    <Box maxW='600px' mx='auto' py='6'>
        <Flex padding='4'>
            <Avatar user={user} size='sm'/>
            <Box flex='1' ml='4'>
                <form onSubmit={handleSubmit(handleAddComment)}>
                    <Box>
                        <Input
                        size='sm'
                        variant='flushed'
                        placeholder="Write Comment ..."
                        autoComplete="off"
                        {...register('text',{required:true})}
                        />
                    </Box>
                    <Flex pt='2'>
                        <Button 
                        isLoading={commentLoading || authLoading}
                        type='submit'
                        colorScheme='orange'
                        size='xs'
                        ml='auto'
                        >
                            Add Comment
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Flex>
    </Box>
  )
}
