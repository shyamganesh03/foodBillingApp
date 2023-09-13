import { View } from 'react-native'
import React from 'react'
import { Text } from '@libs/components'

const CommonApplication = ({ fieldData }) => {
  return (
    <View>
      {fieldData?.sections?.map((sectionItem, sectionIndex) => {
        console.log({ sectionItem })
        return (
          <View>
            <Text variant="heading2">{sectionItem?.title}</Text>
          </View>
        )
      })}
    </View>
  )
}

export default CommonApplication
