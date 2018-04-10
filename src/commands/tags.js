import { Command } from 'discord-akairo'

import { msgDeleteTime, prefix } from '../config'
import colours from '../colours'

import tags from '../tags'

export default class TagCommand extends Command {
  constructor () {
    super('tags', {
      aliases: ['tags', 'taglist'],
      category: 'assistance',
      description: 'List of Available Tags.',
      cooldown: 1000 * msgDeleteTime,
      ratelimit: 1
    })
  }

  // noinspection JSMethodCanBeStatic
  async exec (message) {
    try {
      const fields = []
      for (const [key, val] of Object.entries(tags)) {
        fields.push({name: val.title, value: `${prefix}tag ${key}`})
      }
      if (fields.length === 0) {
        fields.push({
          name: 'No Tags',
          value: 'There are currently no tags added.'
        })
      }
      const user = message.member ? message.member.user : message.author
      const embed = {
        title: 'List of Tags',
        color: colours.blue,
        fields,
        author: {
          name: user.username,
          icon_url: user.avatarURL
        }
      }
      if (message.channel.type !== 'dm') {
        await message.delete(1)
        const sent = await message.util.send({embed})
        return setTimeout(() => {
          sent.delete(1)
        }, msgDeleteTime * 1000)
      } else {
        return message.util.send({embed})
      }
    } catch (e) {
      console.log(`Tags command failed: ${e}`)
      return null
    }
  }
}