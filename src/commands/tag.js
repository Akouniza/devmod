import { Command } from 'discord-akairo'

import colours from '../colours'

import tags from '../tags'

export default class TagCommand extends Command {
  constructor () {
    super('tag', {
      aliases: ['tag'],
      args: [
        {
          id: 'tag'
        },
        {
          id: 'member',
          type: 'member'
        }
      ]
    })
  }

  // noinspection JSMethodCanBeStatic
  exec (message, args) {
    let embed
    if (tags.hasOwnProperty(args.tag.toLowerCase())) {
      embed = tags[args.tag.toLowerCase()]
    } else {
      embed = {
        title: 'Tag Not Found',
        color: colours.red,
        description: 'No tag with that name exists.'
      }
      message.react('❌')
    }
    embed.author = {
      name: message.member.user.username,
      icon_url: message.member.user.avatarURL
    }
    if (args.member) {
      return message.util.send(args.member, {embed})
    } else {
      return message.util.send({embed})
    }
  }
}