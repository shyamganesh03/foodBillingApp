import { spacing } from '@libs/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  dropDownOutLineContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderColor: '#001A36',
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  dropDownContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
    backgroundColor: 'transparent',
    padding: 4,
    alignItems: 'center',
  },
  dropDownList: {
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    shadowColor: 'rgba(0, 15, 68, 0.15)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    flex: 1,
  },
  dropDownListContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  filterDropDown: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.spacing3,
  },
  filterField: {
    marginLeft: 10,
  },
  dropDownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  scroll: {
    flex: 1,
  },
  disable: {},
})
