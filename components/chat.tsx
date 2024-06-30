'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState, useMemo } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import Image from 'next/image'

const newsSources = [
  { key: "BBC", icon: "/bbc.svg", alt: "BBC Icon" },
  { key: "CNN", icon: "/cnn.svg", alt: "CNN Icon" },
  { key: "Time", icon: "/time.svg", alt: "Time Icon" },
  { key: "NPR", icon: "/npr.svg", alt: "NPR Icon" },
  { key: "Fox", icon: "/fox.svg", alt: "Fox Icon" },
];

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()

  const [_, setNewChatId] = useLocalStorage('newChatId', id)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, path, session?.user, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  const [selectedKeys, setSelectedKeys] = useState(new Set([newsSources[0].key]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const selectedSource = useMemo(() =>
    newsSources.find(source => source.key === selectedValue) || newsSources[0],
    [selectedValue]
  );

  return (
    <div className="flex w-full h-screen">
      <div className="w-64 h-screen bg-gray-800 p-4 flex flex-col space-y-6">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded"
            >
              <Image
                src={selectedSource.icon}
                width={20}
                height={20}
                alt={selectedSource.alt}
                className="mr-2"
              />
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="News Source Selection"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            className="bg-white shadow-lg rounded-md text-black"
          >
            {newsSources.map((source) => (
              <DropdownItem
                key={source.key}
                startContent={<Image src={source.icon} width={20} height={20} alt={source.alt} />}
              >
                {source.key}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <div className="flex gap-6 w-full max-w-md pt-8">
          <Slider
            label="personal bias"
            size="sm"
            step={0.01}
            maxValue={1}
            minValue={0}
            aria-label="Temperature"
            defaultValue={0.2}
            className="max-w-md"
          />
        </div>
      </div>
      <div
        className="flex-grow overflow-auto"
        ref={scrollRef}
      >
        <div
          className={cn('pb-[200px] pt-4 md:pt-10', className)}
          ref={messagesRef}
        >
          {messages.length ? (
            <ChatList messages={messages} isShared={false} session={session} />
          ) : (
            <EmptyScreen />
          )}
          <div className="w-full h-px" ref={visibilityRef} />
        </div>
        <ChatPanel
          id={id}
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </div>
  )
}
