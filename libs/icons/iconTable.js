import React from 'react'
import { Icon } from '@r3-oaf/native-icons'

const allIconsData = [
  'Star',
  'AcademicCap',
  'AlertCircle',
  'Archive',
  'ArrowNarrowLeft',
  'ArrowNarrowRight',
  'ArrowBack',
  'ArrowDown',
  'ArrowRight',
  'ArrowUp',
  'Bell',
  'Briefcase',
  'CalendarOutline',
  'Calendar',
  'Camera',
  'ChartBar',
  'CheckCircle',
  'Check',
  'ClipboardCheck',
  'ClipboardList',
  'Clock',
  'Close',
  'Code',
  'Cog',
  'Database',
  'Delete',
  'DocumentDownload',
  'DocumentList',
  'DocumentText',
  'DotsHorizontal',
  'DotsVertical',
  'Download',
  'Duplicate',
  'Edit',
  'Exclamation',
  'ExternalLink',
  'EyeOff',
  'Eye',
  'FilterHorrizontal',
  'Filter',
  'Globe',
  'Import',
  'Inbox',
  'LocationMarker',
  'Logout',
  'MailOpen',
  'Mail',
  'Menu',
  'Message',
  'Move',
  'Newspaper',
  'NoContract',
  'Notes',
  'OfficeBuilding',
  'OutBox',
  'Parlament',
  'Pathway',
  'Phone',
  'Play',
  'Plus',
  'Reply',
  'Search',
  'Selector',
  'ShoppingCart',
  'StudyOutline',
  'SubjectOutline',
  'Tag',
  'ThumbUp',
  'Trash',
  'User',
  'ViewGrid',
]

function IconTable() {
  return allIconsData.map((icon) => (
    <Icon
      name={icon}
      width={40}
      height={40}
      color="#fff"
      style={{ padding: 40 }}
    />
  ))
}

export default IconTable
