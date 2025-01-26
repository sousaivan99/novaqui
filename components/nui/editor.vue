<template>
	<div
		class="flex flex-col gap-4 rounded-lg border border-surface-variant p-4"
	>
		<!-- Main Toolbar -->
		<div
			class="flex flex-wrap items-center gap-2 border-b border-surface-variant pb-3"
		>
			<!-- Text Formatting Group -->
			<div
				class="flex items-center gap-1 pr-3 border-r border-surface-variant"
			>
				<NuiButton
					v-for="(tool, index) in textTools"
					:key="index"
					@click="tool.action"
					:mode="
						isActive(tool.command) ? 'filled' : 'text'
					"
					:variant="
						isActive(tool.command)
							? 'primary'
							: 'normal'
					"
					class="tooltip"
					:data-tooltip="tool.label"
				>
					<Icon :name="tool.icon" class="text-lg" />
				</NuiButton>
			</div>

			<!-- Text Alignment Group -->
			<div
				class="flex items-center gap-1 pr-3 border-r border-surface-variant"
			>
				<NuiButton
					v-for="(tool, index) in alignmentTools"
					:key="index"
					@click="tool.action"
					:mode="
						isActive(tool.command) ? 'filled' : 'text'
					"
					:variant="
						isActive(tool.command)
							? 'primary'
							: 'normal'
					"
					class="tooltip"
					:data-tooltip="tool.label"
				>
					<Icon :name="tool.icon" class="text-lg" />
				</NuiButton>
			</div>

			<!-- Paragraph Formatting Group -->
			<div
				class="flex items-center gap-1 pr-3 border-r border-surface-variant"
			>
				<select
					v-model="currentBlock"
					@change="formatBlock(($event.target as HTMLSelectElement)?.value)"
					class="px-2 py-1 border border-outline rounded-md text-sm font-medium bg-surface-container"
				>
					<option value="p">Paragraph</option>
					<option value="h1">Heading 1</option>
					<option value="h2">Heading 2</option>
					<option value="h3">Heading 3</option>
					<option value="blockquote">Quote</option>
					<option value="pre">Code Block</option>
				</select>
			</div>

			<!-- List and Indent Group -->
			<div
				class="flex items-center gap-1 pr-3 border-r border-surface-variant"
			>
				<NuiButton
					v-for="(tool, index) in listTools"
					:key="index"
					@click="tool.action"
					:mode="
						isActive(tool.command) ? 'filled' : 'text'
					"
					:variant="
						isActive(tool.command)
							? 'primary'
							: 'normal'
					"
					size="sm"
					class="tooltip"
					:data-tooltip="tool.label"
				>
					<Icon :name="tool.icon" class="text-lg" />
				</NuiButton>
			</div>

			<!-- Insert Group -->
			<div class="flex items-center gap-1">
				<NuiButton
					v-for="(tool, index) in insertTools"
					:key="index"
					@click="tool.action"
					mode="text"
					variant="normal"
					size="sm"
					class="tooltip"
					:data-tooltip="tool.label"
				>
					<Icon :name="tool.icon"  />
				</NuiButton>
			</div>
		</div>

		<!-- Editable Area -->
		<div
			ref="editorRef"
			class="editor"
			contenteditable="true"
			@input="updateContent"
			@paste="handlePaste"
			@keyup="handleSelectionChange"
			@mouseup="handleSelectionChange"
			@contextmenu="handleContextMenu"
		></div>

		<!-- Word Count -->
		<div class="text-sm text-on-surface-variant">
			{{ wordCount }} words
		</div>
	</div>

	<!-- Image Modal -->
	<NuiModal v-model="isImageModalOpen" title="Insert Image">
		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-medium">Insert Image</h3>
			
			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium">Upload Image</label>
				<input 
					type="file" 
					accept="image/*" 
					@change="handleImageUpload"
					class="block w-full text-sm text-on-surface-variant
						   file:mr-4 file:py-2 file:px-4
						   file:rounded-md file:border-0
						   file:text-sm file:font-medium
						   file:bg-surface-container file:text-on-surface
						   hover:file:bg-surface-container-high"
				/>
			</div>
			
			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium">Or enter image URL</label>
				<NuiInput 
					v-model="imageUrl" 
					placeholder="https://example.com/image.jpg"
					type="text"
				/>
			</div>

			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium">Alt Text</label>
				<NuiInput 
					v-model="imageAlt" 
					placeholder="Image description"
					type="text"
				/>
			</div>

			<div class="flex justify-end gap-2 mt-4">
				<NuiButton
					mode="text"
					variant="normal"
					@click="closeImageModal"
				>
					Cancel
				</NuiButton>
				<NuiButton
					mode="filled"
					variant="primary"
					@click="insertImage"
					:disabled="!imageUrl"
				>
					Insert
				</NuiButton>
			</div>
		</div>
	</NuiModal>

	<!-- Link Modal -->
	<NuiModal v-model="isLinkModalOpen" title="Insert Link">
		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-medium">Insert Link</h3>
			
			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium">URL</label>
				<NuiInput 
					v-model="linkUrl" 
					placeholder="https://example.com"
					type="text"
				/>
			</div>
			
			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium">Text</label>
				<NuiInput 
					v-model="linkText" 
					placeholder="Link text"
					type="text"
				/>
			</div>

			<div class="flex items-center gap-2">
				<input
					type="checkbox"
					v-model="openInNewTab"
					id="openInNewTab"
					class="w-4 h-4 text-primary bg-surface border-surface-variant rounded focus:ring-primary"
				/>
				<label 
					for="openInNewTab"
					class="ml-2 text-sm font-medium text-on-surface"
				>
					Open in new tab
				</label>
			</div>

			<div class="flex justify-end gap-2 mt-4">
				<NuiButton
					mode="text"
					variant="normal"
					@click="closeLinkModal"
				>
					Cancel
				</NuiButton>
				<NuiButton
					mode="filled"
					variant="primary"
					@click="insertLink"
					:disabled="!linkUrl"
				>
					Insert
				</NuiButton>
			</div>
		</div>
	</NuiModal>

	<!-- Tweet Modal -->
	<NuiModal v-model="isTweetModalOpen" title="Insert Tweet">
		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-medium">Insert Tweet</h3>
			
			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium">Tweet Embed Code</label>
				<textarea
					v-model="tweetEmbedCode" 
					placeholder="Paste the full tweet embed code here..."
					rows="6"
					class="font-mono text-sm bg-surface-container-high p-2 rounded-md"
				/>
			</div>

			<div class="flex justify-end gap-2 mt-4">
				<NuiButton
					mode="text"
					variant="normal"
					@click="isTweetModalOpen = false"
				>
					Cancel
				</NuiButton>
				<NuiButton
					mode="filled"
					variant="primary"
					@click="insertTweet"
				>
					Insert
				</NuiButton>
			</div>
		</div>
	</NuiModal>

	<!-- Dynamic Context Menu -->
	<div v-if="showContextMenu" 
		 class="context-menu z-50"
		 :style="{ 
			 left: `${contextMenuPosition.x}px`, 
			 top: `${contextMenuPosition.y}px` 
		 }"
		 @click.stop>
		<button v-for="item in contextMenuItems"
				v-show="contextMenuTarget && item.showFor.includes(contextMenuTarget.type)"
				:key="item.label"
				@click="item.action"
				class="context-menu-item">
			<Icon :name="item.icon" />
			{{ item.label }}
		</button>
	</div>
</template>

<script setup lang="ts">
import {
	ref,
	computed,
	onMounted,
	onUnmounted,
	shallowRef,
	type Ref,
} from "vue"

interface Tool {
	label: string
	icon: string
	action: () => void
	command: string
}

interface EditorState {
	bold: boolean
	italic: boolean
	underline: boolean
	strikeThrough: boolean
	insertOrderedList: boolean
	insertUnorderedList: boolean
	justifyLeft: boolean
	justifyCenter: boolean
	justifyRight: boolean
	justifyFull: boolean
}

interface Props {
	modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
	'update:modelValue': [value: string]
	'update:currentBlock': [value: string]
}>()

function useDebounceFn(fn, delay) {
	let timeoutId
	
	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => fn(...args), delay)
	}
} 

const editorRef = shallowRef<HTMLDivElement | null>(null)
const isImageModalOpen = ref(false)
const isLinkModalOpen = ref(false)
const isTweetModalOpen = ref(false)
const imageUrl = ref('')
const imageAlt = ref('')
const linkUrl = ref('')
const linkText = ref('')
const openInNewTab = ref(true)
const currentEditingLink = ref(null)
const showContextMenu = ref(false)
const contextMenuPosition = ref({ x: 0, y: 0 })
const contextMenuTarget = ref<ContextMenuTarget | null>(null)
const savedRange = ref(null)
const currentBlock = ref<string>('p')
const tweetEmbedCode = ref('')
const draggedElement = ref(null)

const activeStates = ref<EditorState>({
	bold: false,
	italic: false,
	underline: false,
	strikeThrough: false,
	insertOrderedList: false,
	insertUnorderedList: false,
	justifyLeft: false,
	justifyCenter: false,
	justifyRight: false,
	justifyFull: false,
})

const formatText = (command: string, value: string | null = null): void => {
	if (command === 'insertOrderedList' || command === 'insertUnorderedList') {
		const selection = window.getSelection();
		if (!selection?.rangeCount) return;
		
		const range = selection.getRangeAt(0);
		const listElement = range.commonAncestorContainer.parentElement?.closest('ul, ol');
		
		if (listElement && document.queryCommandState(command)) {
			// We're removing a list, so let's handle it manually
			const items = Array.from(listElement.querySelectorAll('li'));
			const fragment = document.createDocumentFragment();
			
			items.forEach((item, index) => {
				// Get the closest parent paragraph if it exists
				const parentP = listElement.closest('p');
				if (parentP) {
					// If we're inside a paragraph, just add the text content
					const textNode = document.createTextNode(item.textContent || '');
					fragment.appendChild(textNode);
					if (index < items.length - 1) {
						fragment.appendChild(document.createElement('br'));
					}
				} else {
					// If we're not inside a paragraph, create a new one
					const p = document.createElement('p');
					p.innerHTML = item.innerHTML;
					fragment.appendChild(p);
				}
			});
			
			// If the list is inside a paragraph, replace the paragraph content
			const parentP = listElement.closest('p');
			if (parentP) {
				parentP.innerHTML = '';
				parentP.appendChild(fragment);
			} else {
				listElement.parentNode?.replaceChild(fragment, listElement);
			}
			
			updateContent();
			return;
		} else {
			// We're creating a new list
			const container = range.commonAncestorContainer;
			const parentP = container.nodeType === 3 ? 
				container.parentElement?.closest('p') : 
				(container as Element)?.closest('p');
			
			if (parentP) {
				// If we're inside a paragraph, create the list inside it
				document.execCommand(command, false, value);
				// Clean up any empty paragraphs
				const emptyParagraphs = parentP.querySelectorAll('p:empty');
				emptyParagraphs.forEach(p => p.remove());
			} else {
				document.execCommand(command, false, value);
			}
		}
	} else {
		document.execCommand(command, false, value);
	}
	
	handleSelectionChange();
	editorRef.value?.focus();
	updateContent();
}

const formatBlock = (block: string): void => {
	const selection = window.getSelection()
	if (!selection?.rangeCount) return

	const range = selection.getRangeAt(0)
	let currentBlock = range.startContainer as Node
	
	while (currentBlock && currentBlock !== editorRef.value) {
		if (currentBlock.nodeType === Node.ELEMENT_NODE && 
			/^(p|h[1-6]|div|pre|blockquote)$/i.test((currentBlock as Element).tagName)) {
			break
		}
		currentBlock = currentBlock.parentNode!
	}

	if (currentBlock && currentBlock !== editorRef.value) {
		const newBlock = document.createElement(block)
		newBlock.innerHTML = (currentBlock as Element).innerHTML
		currentBlock.parentNode!.replaceChild(newBlock, currentBlock)
		
		const newRange = document.createRange()
		newRange.selectNodeContents(newBlock)
		newRange.collapse(false)
		selection.removeAllRanges()
		selection.addRange(newRange)
	} else {
		document.execCommand('formatBlock', false, block)
	}

	updateContent()
}

const isActive = computed(() => (command: string) => activeStates.value[command as keyof EditorState])

const addLink = () => {
	const selection = window.getSelection()
	if (selection.toString()) {
		const url = prompt("Enter the URL:", "https://")
		if (url) {
			document.execCommand("createLink", false, url)
			editorRef.value?.focus()
		}
	} else {
		alert("Please select some text first")
	}
}

const openImageModal = () => {
	imageUrl.value = ''
	imageAlt.value = ''
	isImageModalOpen.value = true
}

const closeImageModal = () => {
	isImageModalOpen.value = false
	imageUrl.value = ''
	imageAlt.value = ''
}

const handleImageUpload = (event) => {
	const file = event.target.files[0]
	if (file) {
		try {
			// Create object URL for immediate preview
			imageUrl.value = URL.createObjectURL(file)
		} catch (error) {
			console.error('Error handling image upload:', error)
		}
	}
}

const insertImage = () => {
	if (!imageUrl.value) return;

	try {
		const editor = editorRef.value;
		if (!editor) return;

		const img = document.createElement('img');
		img.src = imageUrl.value;
		img.alt = imageAlt.value || '';
		img.style.maxWidth = '100%';
		
		editor.appendChild(img);
		// The observer will automatically wrap the image
		
		const br = document.createElement('br');
		img.after(br);

		closeImageModal();
		editor.focus();
		updateContent();
	} catch (error) {
		console.error('Error inserting image:', error);
	}
}

const handlePaste = (e) => {
	e.preventDefault()
	const text = e.clipboardData.getData("text/plain")
	const selection = window.getSelection()
	const range = selection.getRangeAt(0)
	
	const textNode = document.createTextNode(text)
	range.deleteContents()
	range.insertNode(textNode)
}

const handleKeyDown = (e: KeyboardEvent): void => {
	// Prevent double firing of event
	if (e.isComposing || e.keyCode === 229) {
		return;
	}
	
	if (e.key === 'Enter') {
		const selection = window.getSelection()
		if (!selection?.rangeCount) return;

		let range = selection.getRangeAt(0)
		const listItem = (range.startContainer as Element)?.closest?.('li') || (range.startContainer.parentElement as Element)?.closest('li')
		const list = (range.startContainer as Element)?.closest?.('ol, ul') || (range.startContainer.parentElement as Element)?.closest('ol, ul')
		const paragraph = (range.startContainer as Element)?.closest?.('p') || (range.startContainer.parentElement as Element)?.closest('p')
		
		// Handle list items
		if (list && listItem) {
			e.preventDefault()
			e.stopPropagation()
			
			// Check if current list item is empty
			const tempDiv = document.createElement('div')
			tempDiv.innerHTML = listItem.innerHTML
			const isEmpty = !tempDiv.textContent?.replace(/\u200B/g, '').trim()
			
			if (isEmpty) {
				// If we're in an empty list item, exit the list
				const p = document.createElement('p')
				const zeroWidthSpace = document.createTextNode('\u200B')
				p.appendChild(zeroWidthSpace)
				
				list.parentNode?.insertBefore(p, list.nextSibling)
				
				// Remove empty list item
				listItem.remove()
				
				// Remove list if empty
				if (!list.children.length) {
					list.remove()
				}
				
				// Focus new paragraph
				const newRange = document.createRange()
				newRange.setStart(zeroWidthSpace, 0)
				newRange.collapse(true)
				selection.removeAllRanges()
				selection.addRange(newRange)
			} else {
				// Create new list item
				const newLi = document.createElement('li')
				const zeroWidthSpace = document.createTextNode('\u200B')
				newLi.appendChild(zeroWidthSpace)
				listItem.insertAdjacentElement('afterend', newLi)
				
				// Focus new list item
				const newRange = document.createRange()
				newRange.setStart(zeroWidthSpace, 0)
				newRange.collapse(true)
				selection.removeAllRanges()
				selection.addRange(newRange)
			}
			
			updateContent()
			return
		}

		// Handle lists inside paragraphs
		if (paragraph && (paragraph.querySelector('ol') || paragraph.querySelector('ul'))) {
			e.preventDefault()
			e.stopPropagation()

			// Get the list and its parent paragraph
			const list = paragraph.querySelector('ol, ul')
			const paragraphParent = paragraph.parentNode

			if (list) {
				// Move list outside and remove paragraph
				paragraphParent?.insertBefore(list, paragraph)
				paragraph.remove()

				// Create new list item
				const newLi = document.createElement('li')
				const zeroWidthSpace = document.createTextNode('\u200B')
				newLi.appendChild(zeroWidthSpace)
				list.appendChild(newLi)

				// Focus new list item
				const newRange = document.createRange()
				newRange.setStart(zeroWidthSpace, 0)
				newRange.collapse(true)
				selection.removeAllRanges()
				selection.addRange(newRange)

				updateContent()
				return
			}
		}
		
		// Handle non-list content
		e.preventDefault()
		
		const currentP = range.startContainer.parentElement
		const p = document.createElement('p')
		const zeroWidthSpace = document.createTextNode('\u200B')
		p.appendChild(zeroWidthSpace)
		
		if (currentP && currentP.tagName.toLowerCase() === 'p') {
			currentP.parentNode?.insertBefore(p, currentP.nextSibling)
		} else {
			// If not in a paragraph, insert one
			range.insertNode(p)
		}
		
		const newRange = document.createRange()
		newRange.setStart(zeroWidthSpace, 0)
		newRange.collapse(true)
		selection.removeAllRanges()
		selection.addRange(newRange)
		
		updateContent()
	}
}

const handleSelectionChange = (): void => {
	if (!editorRef.value) return

	const selection = window.getSelection()
	if (!selection?.rangeCount) return

	const range = selection.getRangeAt(0)
	let node = range.commonAncestorContainer as Node
	
	if (node.nodeType === Node.TEXT_NODE) {
		node = node.parentNode!
	}

	// Use type assertion for document.queryCommandState
	activeStates.value = {
		bold: document.queryCommandState('bold'),
		italic: document.queryCommandState('italic'),
		underline: document.queryCommandState('underline'),
		strikeThrough: document.queryCommandState('strikethrough'),
		insertOrderedList: document.queryCommandState('insertOrderedList'),
		insertUnorderedList: document.queryCommandState('insertUnorderedList'),
		justifyLeft: document.queryCommandState('justifyLeft'),
		justifyCenter: document.queryCommandState('justifyCenter'),
		justifyRight: document.queryCommandState('justifyRight'),
		justifyFull: document.queryCommandState('justifyFull')
	}
}

const updateCurrentBlockFormat = () => {
	const selection = window.getSelection();
	if (!selection.rangeCount) return;

	const range = selection.getRangeAt(0);
	let node = range.startContainer;
	
	// Find the current block element
	while (node && node !== editorRef.value) {
		if (node.nodeType === 1) {
			switch (node.tagName.toLowerCase()) {
				case 'h1':
					currentBlock.value = 'h1';
					return;
				case 'h2':
					currentBlock.value = 'h2';
					return;
				case 'h3':
					currentBlock.value = 'h3';
					return;
				case 'blockquote':
					currentBlock.value = 'blockquote';
					return;
				case 'pre':
					currentBlock.value = 'pre';
					return;
				case 'p':
					currentBlock.value = 'p';
					return;
			}
		}
		node = node.parentNode;
	}
	
	// Default to paragraph if no block found
	currentBlock.value = 'p';
};

onMounted(() => {
	if (editorRef.value) {
		let content = props.modelValue;
		const tempDiv = document.createElement('div');
		
		if (!content.trim().startsWith('<div>')) {
			content = `<div>${content}</div>`;
		}
		
		tempDiv.innerHTML = content;
		
		// Ensure text nodes are wrapped in paragraphs
		const rootDiv = tempDiv.querySelector('div');
		if (rootDiv) {
			Array.from(rootDiv.childNodes).forEach(child => {
				if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
					const p = document.createElement('p');
					p.appendChild(child.cloneNode(true));
					child.replaceWith(p);
				}
			});
		}
		
		// Remove empty divs
		tempDiv.querySelectorAll('div:empty').forEach(div => div.remove());
		
		editorRef.value.innerHTML = tempDiv.innerHTML;
		
		// Remove any existing listeners before adding new ones
		editorRef.value.removeEventListener('keydown', handleKeyDown);
		editorRef.value.removeEventListener('input', handleInput as EventListener);
		
		// Add event listeners
		editorRef.value.addEventListener('keydown', handleKeyDown);
		editorRef.value.addEventListener('input', handleInput as EventListener);
		document.addEventListener('contextmenu', handleContextMenu);
		
		// Add document click listener
		document.addEventListener('click', handleDocumentClick)
	}
})

onUnmounted(() => {
	// Remove event listeners and clean up resources
	document.removeEventListener('click', closeContextMenu)
	
	// Remove document click listener
	document.removeEventListener('click', handleDocumentClick)
})

const updateContent = (): void => {
	if (!editorRef.value) return;
	
	// Create a temporary div to normalize the content
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = editorRef.value.innerHTML;
	
	// Ensure text nodes are wrapped in paragraphs
	const wrapTextNodesInP = (node: HTMLElement) => {
		const fragment = document.createDocumentFragment();
		Array.from(node.childNodes).forEach(child => {
			if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
				const p = document.createElement('p');
				p.appendChild(child.cloneNode(true));
				fragment.appendChild(p);
			} else {
				fragment.appendChild(child.cloneNode(true));
			}
		});
		node.innerHTML = '';
		node.appendChild(fragment);
	};

	// If root div exists, normalize its content
	const rootDiv = tempDiv.querySelector('div');
	if (rootDiv) {
		wrapTextNodesInP(rootDiv);
		
		// Clean up empty elements
		const cleanupEmptyElements = () => {
			let removed = false;
			
			// Remove empty paragraphs
			rootDiv.querySelectorAll('p').forEach(p => {
				const isEmpty = !p.textContent?.trim() || p.textContent === '\u200B';
				if (isEmpty && rootDiv.children.length > 1) {
					p.remove();
					removed = true;
				}
			});
			
			// Remove empty list items and their parent lists if empty
			rootDiv.querySelectorAll('li').forEach(li => {
				const isEmpty = !li.textContent?.trim() || li.textContent === '\u200B';
				if (isEmpty) {
					const parentList = li.closest('ul, ol');
					if (parentList) {
						if (parentList.children.length === 1) {
							// If this is the only list item, remove the entire list
							parentList.remove();
						} else {
							// Otherwise, just remove this empty item
							li.remove();
						}
						removed = true;
					}
				}
			});
			
			// Clean up consecutive lists
			let prevElement: Element | null = null;
			Array.from(rootDiv.children).forEach(element => {
				if (prevElement?.tagName === element.tagName && 
					(element.tagName === 'OL' || element.tagName === 'UL')) {
					while (element.firstChild) {
						prevElement.appendChild(element.firstChild);
					}
					element.remove();
					removed = true;
				} else {
					prevElement = element;
				}
			});
			
			return removed;
		};
		
		// Keep cleaning up until no more changes are made
		while (cleanupEmptyElements()) {
			// Continue cleaning until no more elements are removed
		}
		
	} else {
		// Create root div and wrap content
		const newContent = document.createElement('div');
		wrapTextNodesInP(tempDiv);
		newContent.innerHTML = tempDiv.innerHTML;
		tempDiv.innerHTML = newContent.outerHTML;
	}
	
	// Remove empty divs
	tempDiv.querySelectorAll('div:empty').forEach(div => div.remove());
	
	emit('update:modelValue', tempDiv.innerHTML);
};

// Add this function to count words correctly
const getWordCount = (html: string): number => {
	// Remove HTML tags
	const text = html.replace(/<[^>]*>/g, ' ')
		// Replace non-breaking spaces and multiple spaces
		.replace(/&nbsp;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
	
	// Return word count, handling empty string case
	return text ? text.split(' ').length : 0
}

// Add this computed property
const wordCount = computed(() => {
	return getWordCount(props.modelValue)
})

// Link handling methods
const openLinkModal = () => {
	const selection = window.getSelection()
	if (selection?.rangeCount > 0) {
		savedRange.value = selection.getRangeAt(0).cloneRange()
		if (selection.toString()) {
			linkText.value = selection.toString()
		} else {
			linkText.value = ''
		}
	}
	linkUrl.value = ''
	openInNewTab.value = true
	isLinkModalOpen.value = true
}

const handleContextMenu = (e: MouseEvent) => {
	console.log('Context menu triggered');
	const editor = editorRef.value;
	const target = e.target as HTMLElement;
	
	if (!editor?.contains(target)) {
		console.log('Target not in editor:', target);
		closeContextMenu();
		return;
	}
	
	console.log('Target element:', target.tagName, target);
	let contextTarget: ContextMenuTarget | null = null;

	// Check for images
	if (target.tagName === 'IMG' || target.closest('img')) {
		console.log('Image detected');
		const img = target.tagName === 'IMG' ? target : target.closest('img');
		if (img) {
			console.log('Image element found:', img);
			contextTarget = { 
				element: img, 
				type: 'image' 
			};
		}
	}
	// Check for tweets
	else if (target.closest('.tweet-wrapper') || target.closest('.twitter-tweet')) {
		console.log('Tweet detected');
		const tweetWrapper = target.closest('.tweet-wrapper');
		if (tweetWrapper) {
			console.log('Tweet wrapper found:', tweetWrapper);
			contextTarget = { 
				element: tweetWrapper, 
				type: 'tweet' 
			};
		}
	}
	// Check for links
	else if (target.tagName === 'A' || target.closest('a')) {
		console.log('Link detected');
		const link = target.tagName === 'A' ? target : target.closest('a');
		if (link) {
			console.log('Link element found:', link);
			contextTarget = { 
				element: link, 
				type: 'link' 
			};
		}
	}

	if (contextTarget && editor.contains(contextTarget.element)) {
		console.log('Opening context menu for:', contextTarget.type);
		e.preventDefault();
		e.stopPropagation();
		showContextMenu.value = true;
		contextMenuPosition.value = { x: e.clientX, y: e.clientY };
		contextMenuTarget.value = contextTarget;
	} else {
		console.log('No valid target found, closing context menu');
		closeContextMenu();
	}
}

const closeContextMenu = () => {
	showContextMenu.value = false
	contextMenuTarget.value = null
}

// Add click outside handler
const handleDocumentClick = (e: MouseEvent) => {
	// If context menu is not shown, do nothing
	if (!showContextMenu.value) return

	// Check if click is inside the editor
	if (editorRef.value?.contains(e.target as Node)) {
		closeContextMenu();
		return;
	}

	// Check if click is outside the context menu and the target element
	const contextMenuEl = document.querySelector('.context-menu')
	const targetEl = contextMenuTarget.value?.element

	// If click is inside context menu, do nothing (allow menu interactions)
	if (contextMenuEl?.contains(e.target as Node)) {
		return;
	}

	// Close the context menu
	closeContextMenu();
}

// Link handling methods
const insertLink = () => {
	if (!linkUrl.value) return;

	try {
		// Focus editor first
		editorRef.value?.focus();
		
		if (currentEditingLink.value) {
			// Update existing link
			currentEditingLink.value.href = linkUrl.value;
			currentEditingLink.value.textContent = linkText.value;
			currentEditingLink.value.target = openInNewTab.value ? '_blank' : '';
			currentEditingLink.value.rel = openInNewTab.value ? 'noopener noreferrer' : '';
			currentEditingLink.value = null;
		} else if (savedRange.value) {
			const selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(savedRange.value);

			const link = document.createElement("a");
			link.href = linkUrl.value;
			link.textContent = linkText.value || linkUrl.value;
			if (openInNewTab.value) {
				link.target = "_blank";
				link.rel = "noopener noreferrer";
			}

			// Delete any existing content in the range if there's a selection
			savedRange.value.deleteContents();
			
			// Insert the link at the saved position
			savedRange.value.insertNode(link);

			// Add space after link
			const space = document.createTextNode(" ");
			link.after(space);
			
			// Move cursor after the inserted link and space
			const newRange = document.createRange();
			newRange.setStartAfter(space);
			newRange.setEndAfter(space);
			selection.removeAllRanges();
			selection.addRange(newRange);
		}

		closeLinkModal();
		updateContent();
	} catch (error) {
		console.error("Error handling link:", error);
	}
};

const closeLinkModal = () => {
	isLinkModalOpen.value = false;
	linkUrl.value = '';
	linkText.value = '';
	currentEditingLink.value = null;
	savedRange.value = null; // Clear saved range
};

// Tool configurations - moved after method declarations
const textTools = computed<Tool[]>(() => [
	{
		label: "Bold",
		icon: "ph:text-b-bold",
		action: () => formatText("bold"),
		command: "bold"
	},
	{
		label: "Italic",
		icon: "ph:text-italic",
		action: () => formatText("italic"),
		command: "italic"
	},
	{
		label: "Underline",
		icon: "ph:text-underline",
		action: () => formatText("underline"),
		command: "underline"
	},
	{
		label: "Strikethrough",
		icon: "ph:text-strikethrough",
		action: () => formatText("strikeThrough"),
		command: "strikeThrough"
	}
])

const alignmentTools = computed<Tool[]>(() => [
	{
		label: "Align Left",
		icon: "ph:text-align-left",
		action: () => formatText('justifyLeft'),
		command: 'justifyLeft'
	},
	{
		label: "Align Center",
		icon: "ph:text-align-center",
		action: () => formatText('justifyCenter'),
		command: 'justifyCenter'
	},
	{
		label: "Align Right",
		icon: "ph:text-align-right",
		action: () => formatText('justifyRight'),
		command: 'justifyRight'
	},
	{
		label: "Justify",
		icon: "ph:text-align-justify",
		action: () => formatText('justifyFull'),
		command: 'justifyFull'
	}
])

const listTools = [
	{
		label: "Numbered List",
		icon: "ph:list-numbers",
		action: () => formatText("insertOrderedList"),
		command: "insertOrderedList",
	},
	{
		label: "Bullet List",
		icon: "ph:list-bullets",
		action: () => formatText("insertUnorderedList"),
		command: "insertUnorderedList",
	},
	{
		label: "Decrease Indent",
		icon: "material-symbols:format-indent-decrease-rounded",
		action: () => formatText("outdent"),
	},
	{
		label: "Increase Indent",
		icon: "material-symbols:format-indent-increase-rounded",
		action: () => formatText("indent"),
	},
]

const insertTools = [
	{
		label: 'Link', 
		icon: 'ph:link',
		action: openLinkModal
	},
	{ 
		label: 'Image', 
		icon: 'ph:image',
		action: openImageModal
	},
	{
		label: 'Clear Formatting',
		icon: 'ph:eraser',
		action: () => formatText('removeFormat')
	},
	{
		label: "Insert Tweet",
		icon: "ph:twitter-logo",
		action: () => isTweetModalOpen.value = true,
		command: "insertTweet"
	}
]

const setupImageObserver = () => {
	const observer = new MutationObserver((mutations) => {
		requestAnimationFrame(() => {
			for (const mutation of mutations) {
				if (!mutation.target.closest('.editor')) continue
				
				for (const node of mutation.addedNodes) {
					if (node.nodeName === 'IMG') {
						if (node.dataset.isDragging) {
							node.remove()
							continue
						}
					} else if (node.getElementsByTagName) {
						const images = node.getElementsByTagName('img')
						for (const img of images) {
							if (!img.closest('.image-wrapper')) {
							}
						}
					}
				}
			}
		})
	})

	if (editorRef.value) {
		observer.observe(editorRef.value, {
			childList: true,
			subtree: true
		})
	}

	return observer
}

const wrapImageWithButton = (img) => {
	// Only wrap images inside the editor
	if (!img.closest('.editor') || img.closest('.image-wrapper')) return;

	const wrapper = document.createElement('div');
	wrapper.className = 'image-wrapper relative inline-block';
	wrapper.contentEditable = 'false';
	wrapper.draggable = true;
	
	const createDeleteButton = () => {
		const deleteBtn = document.createElement('button');
		deleteBtn.innerHTML = '<span class="select-none pointer-events-none">×</span>';
		deleteBtn.className = 'delete-image-btn hidden absolute top-5 right-2 bg-error text-on-error rounded-full w-6 h-6 flex items-center justify-center hover:bg-error-container select-none';
		deleteBtn.contentEditable = 'false';
		deleteBtn.tabIndex = -1;
		deleteBtn.setAttribute('unselectable', 'on');
		deleteBtn.onclick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			wrapper.remove();
			updateContent();
		};
		return deleteBtn;
	};
	
	wrapper.ondragstart = (e) => {
		e.dataTransfer.setData('text/html', wrapper.querySelector('img').outerHTML);
		e.dataTransfer.effectAllowed = 'move';
		wrapper.style.opacity = '0.4';
	};
	
	wrapper.ondragend = (e) => {
		wrapper.style.opacity = '1';
		if (e.dataTransfer.dropEffect === 'move') {
			wrapper.remove();
		}
		updateContent();
	};

	wrapper.ondragover = (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	};

	wrapper.ondrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const html = e.dataTransfer.getData('text/html');
		if (html) {
			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = html;
			const newImg = tempDiv.querySelector('img');
			if (newImg) {
				wrapper.insertAdjacentElement('beforebegin', newImg.closest('.image-wrapper'));
				wrapper.remove();
				updateContent();
			}
		}
	};

	img.parentNode.insertBefore(wrapper, img);
	wrapper.appendChild(img);
	wrapper.appendChild(createDeleteButton());
	img.contentEditable = 'false';
};

const editLink = () => {
	if (currentEditingLink.value) {
		linkUrl.value = currentEditingLink.value.href;
		linkText.value = currentEditingLink.value.textContent;
		openInNewTab.value = currentEditingLink.value.target === '_blank';
		isLinkModalOpen.value = true;
	}
	showContextMenu.value = false;
};

const cleanup = () => {
	document.removeEventListener('click', closeContextMenu)
	// Clear any remaining refs
	editorRef.value = null
	currentEditingLink.value = null
}

// Add this helper function
const wrapTextInParagraphs = (html) => {
	const div = document.createElement('div');
	div.innerHTML = html;
	
	// Convert direct text nodes and br tags to paragraphs
	const fragment = document.createDocumentFragment();
	let currentP = null;
	
	Array.from(div.childNodes).forEach(node => {
		if (node.nodeType === 3 || node.nodeName === 'BR') { // Text node or BR
			if (!currentP) {
				currentP = document.createElement('p');
				fragment.appendChild(currentP);
			}
			currentP.appendChild(node.cloneNode(true));
		} else {
			currentP = null;
			fragment.appendChild(node.cloneNode(true));
		}
	});
	
	div.innerHTML = '';
	div.appendChild(fragment);
	return div.innerHTML;
};

// Update the insertTweet function to remove drag-related code
const insertTweet = () => {
	try {
		if (!tweetEmbedCode.value) return
		
		const editorElement = editorRef.value
		if (!editorElement) return
		
		const tempDiv = document.createElement('div')
		tempDiv.innerHTML = tweetEmbedCode.value
		
		const tweetBlockquote = tempDiv.querySelector('.twitter-tweet')
		if (!tweetBlockquote) return
		tweetBlockquote.setAttribute('data-dnt', 'true')
		
		const tweetWrapper = document.createElement('div')
		tweetWrapper.className = 'tweet-wrapper'
		tweetWrapper.setAttribute('data-type', 'tweet')
		tweetWrapper.appendChild(tweetBlockquote)
		
		// Insert the tweet
		const selection = window.getSelection()
		if (selection?.rangeCount) {
			const range = selection.getRangeAt(0)
			if (editorElement.contains(range.commonAncestorContainer)) {
				range.deleteContents()
				range.insertNode(tweetWrapper)
			} else {
				editorElement.appendChild(tweetWrapper)
			}
		} else {
			editorElement.appendChild(tweetWrapper)
		}

		// Add Twitter script if not present
		if (!document.querySelector('script[src*="platform.twitter.com/widgets.js"]')) {
			const script = document.createElement('script')
			script.async = true
			script.src = "https://platform.twitter.com/widgets.js"
			script.charset = "utf-8"
			document.head.appendChild(script)
		}

		// Force reload Twitter widgets
		if (window.twttr?.widgets) {
			setTimeout(() => {
				window.twttr.widgets.load(tweetWrapper)
			}, 100)
		}
		
		isTweetModalOpen.value = false
		tweetEmbedCode.value = ''
		updateContent()
	} catch (error) {
		console.error('Error inserting tweet:', error)
	}
}

// Update types
interface ContextMenuTarget {
	element: HTMLElement;
	type: 'tweet' | 'image' | 'link';
}

interface ContextMenuItem {
	icon: string;
	label: string;
	action: () => void;
	showFor: ContextMenuTarget['type'][];
}

// Add context menu items configuration
const contextMenuItems = computed((): ContextMenuItem[] => [
	{
		icon: 'ph:trash',
		label: 'Delete',
		action: () => {
			console.log('Delete action triggered');
			if (!contextMenuTarget.value) {
				console.log('No context target available');
				return;
			}

			const editor = editorRef.value;
			if (!editor?.contains(contextMenuTarget.value.element)) {
				console.log('Target element not in editor');
				return;
			}

			try {
				console.log('Attempting to delete:', contextMenuTarget.value.type);
				switch (contextMenuTarget.value.type) {
					case 'image': {
						const img = contextMenuTarget.value.element;
						console.log('Found image:', img);
						if (img && editor.contains(img)) {
							// If image is in a wrapper, remove the wrapper, otherwise remove the image
							const wrapper = img.closest('.image-wrapper');
							if (wrapper && editor.contains(wrapper)) {
								wrapper.parentNode?.removeChild(wrapper);
								console.log('Image wrapper removed');
							} else {
								img.parentNode?.removeChild(img);
								console.log('Direct image removed');
							}
						}
						break;
					}
					case 'tweet': {
						const wrapper = contextMenuTarget.value.element.closest('.tweet-wrapper');
						console.log('Found tweet wrapper:', wrapper);
						if (wrapper && editor.contains(wrapper)) {
							wrapper.parentNode?.removeChild(wrapper);
							console.log('Tweet successfully removed');
						}
						break;
					}
					case 'link': {
						const link = contextMenuTarget.value.element;
						console.log('Found link:', link);
						if (link && link.tagName === 'A' && editor.contains(link)) {
							const text = link.textContent || '';
							const textNode = document.createTextNode(text);
							link.parentNode?.replaceChild(textNode, link);
							console.log('Link successfully removed, text preserved:', text);
						}
						break;
					}
				}

				updateContent();
				showContextMenu.value = false;
				console.log('Content updated and context menu closed');
			} catch (error) {
				console.error('Error during deletion:', error);
			}
		},
		showFor: ['tweet', 'image', 'link'].filter(() => {
			const editor = editorRef.value;
			const isInEditor = editor?.contains(contextMenuTarget.value?.element) ?? false;
			console.log('Show delete for:', contextMenuTarget.value?.type, 'isInEditor:', isInEditor);
			return isInEditor;
		})
	},
	{
		icon: 'ph:pencil',
		label: 'Edit Link',
		action: () => {
			if (contextMenuTarget.value?.type === 'link') {
				const linkElement = contextMenuTarget.value.element as HTMLAnchorElement
				linkUrl.value = linkElement.href
				linkText.value = linkElement.textContent || ''
				savedRange.value = document.createRange()
				savedRange.value.selectNode(linkElement)
				isLinkModalOpen.value = true
				showContextMenu.value = false
			}
		},
		showFor: ['link']
	},
	{
		icon: 'ph:link-break',
		label: 'Remove Link',
		action: () => {
			if (contextMenuTarget.value?.type === 'link' && 
				contextMenuTarget.value.element.closest('.editor')) {
				const linkElement = contextMenuTarget.value.element as HTMLAnchorElement
				const textNode = document.createTextNode(linkElement.textContent || '')
				linkElement.parentNode?.replaceChild(textNode, linkElement)
				updateContent()
				showContextMenu.value = false
			}
		},
		showFor: ['link'].filter(() => 
			contextMenuTarget.value?.element.closest('.editor') !== null
		)
	}
])

// Add handleInput definition
const handleInput = (e: Event): void => {
    updateContent()
}
</script>

<style>
/* Global tweet styles */
.tweet-wrapper {
    margin: 1rem auto;
    min-height: 100px;
    position: relative;
    display: inline-block;
    max-width: 550px;
    width: 100%;
}

.tweet-wrapper iframe {
    border: none !important;
    width: 100% !important;
    margin: 0 auto !important;
}

/* Editor-specific styles */
.editor .tweet-wrapper {
    position: relative; /* Ensure positioning context */
}

.editor .tweet-wrapper .delete-tweet-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 24px;
    height: 24px;
    background-color: rgb(var(--color-error));
    color: rgb(var(--color-on-error));
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    z-index: 2;
    padding: 0;
    align-items: center;
    justify-content: center;
    display: none; /* Hidden by default */
}

/* Show delete button on hover only inside editor */
.editor .tweet-wrapper:hover .delete-tweet-btn {
    display: flex !important; /* Force display on hover */
}

.editor .tweet-wrapper .delete-tweet-btn:hover {
    opacity: 0.9;
}

/* Ensure button is hidden outside editor */
.tweet-wrapper > .delete-tweet-btn {
    display: none !important;
}

/* Editor content styles */
/* Tooltip styles */
.tooltip {
	position: relative;
}

.tooltip:hover::after {
	content: attr(data-tooltip);
	position: absolute;
	bottom: -30px;
	left: 50%;
	transform: translateX(-50%);
	padding: 4px 8px;
	background-color: rgb(
		var(--color-surface-container-highest)
	);
	color: rgb(var(--color-on-surface));
	border-radius: 4px;
	font-size: 12px;
	white-space: nowrap;
	z-index: 10;
}

/* Update image wrapper styles to be scoped to the editor */
.editor .image-wrapper {
	position: relative;
	display: inline-block;
}

.editor .image-wrapper .delete-image-btn {
	display: none;
	position: absolute;
	top: 5px;
	right: 2px;
	background-color: rgb(var(--color-error));
	color: rgb(var(--color-on-error));
	border-radius: 9999px;
	width: 1.5rem;
	height: 1.5rem;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.editor .image-wrapper:hover .delete-image-btn {
	display: flex;
}

/* Remove the old styles */
.image-wrapper .delete-image-btn {
	display: none;
}

/* Context Menu styles */
.fixed {
	position: fixed;
}

.z-50 {
	z-index: 50;
}

/* Optimize CSS selectors */
.editor :where(h1, h2, h3) {
	margin-block: 0.5em;
}

/* Remove delete button styles and add context menu styles */
.context-menu {
	position: fixed;
	background: rgb(var(--color-surface));
	border: 1px solid rgb(var(--color-border));
	border-radius: 4px;
	padding: 4px;
	z-index: 1000;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	min-width: 160px;
}

.context-menu-item {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 16px;
	width: 100%;
	border: none;
	background: none;
	cursor: pointer;
	white-space: nowrap;
	color: rgb(var(--color-on-surface));
	font-size: 0.9rem;
}

.context-menu-item:hover {
	background: rgb(var(--color-surface-variant));
}

.context-menu-item .icon {
	font-size: 1.2em;
}

/* Update tweet and image wrapper styles */
.tweet-wrapper,
.image-wrapper {
	margin: 1rem auto;
	position: relative;
	display: inline-block;
}

.tweet-wrapper {
	max-width: 550px;
	width: 100%;
	min-height: 100px;
}

.tweet-wrapper iframe {
	border: none !important;
	width: 100% !important;
	margin: 0 auto !important;
}

.editor .tweet-wrapper {
	position: relative;
	margin: 1rem auto;
	max-width: 550px;
	width: 100%;
}

.editor .tweet-wrapper::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
}

.editor .tweet-wrapper iframe {
	pointer-events: none !important;
	position: relative;
	z-index: 0;
}

/* Ensure the wrapper gets the context menu events */
.editor .tweet-wrapper:hover {
	cursor: context-menu;
}

/* Add styles for word count */
.editor-stats {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: rgb(var(--color-on-surface-variant));
}
</style>
