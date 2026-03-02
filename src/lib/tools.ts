import { FileText, Scissors, Minimize2, Image, ImagePlus, RotateCw, ArrowUpDown, Droplets, Lock, Unlock, FileType, FileCode, ScanSearch, Highlighter, EyeOff } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "core" | "convert" | "advanced";
  color: string;
  seoTitle: string;
  seoContent: string;
  seoDefinition: string;
  seoQuickAnswer: string;
  seoSteps: { name: string; description: string }[];
  seoFaqs: { question: string; answer: string }[];
}

export const tools: Tool[] = [
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDFs into one document",
    icon: FileText,
    category: "core",
    color: "bg-primary",
    seoTitle: "Merge PDF Files Online For Free | Fylora",
    seoContent: "Merging your PDF files has never been easier or more secure. Fylora's Merge PDF tool allows you to combine multiple PDF documents into a single, cohesive file entirely within your web browser. Perfect for students organizing research papers, professionals compiling monthly reports, or anyone looking to declutter their digital workspace. Unlike other online document tools, Fylora processes your files client-side. This means your private files never touch our servers, ensuring 100% privacy and lightning-fast speeds. Start merging your PDFs instantly, without annoying ads or forced sign-ups.",
    seoDefinition: "Merge PDF is an online tool that allows users to combine multiple PDF files into a single document quickly and securely.",
    seoQuickAnswer: "The fastest way to merge PDF files is using Fylora’s online Merge PDF tool. Upload your files, arrange them, and download the combined PDF instantly — no sign-up required.",
    seoSteps: [
      { name: "Upload your PDFs", description: "Select or drag and drop multiple PDF files into the tool." },
      { name: "Arrange Order", description: "Drag the files to position them exactly how you want them merged." },
      { name: "Download Merged PDF", description: "Click 'process' and download your combined document instantly." }
    ],
    seoFaqs: [
      { question: "How to merge PDF files online for free?", answer: "To merge PDFs for free, simply navigate to Fylora's Merge PDF tool, upload your document files, drag to reorder them as needed, and hit process. Your combined file is generated instantly inside your browser." },
      { question: "Is merging PDFs online safe?", answer: "Yes, merging PDFs online with Fylora is completely safe because processing happens entirely client-side. Your files are never uploaded to our servers, ensuring absolute privacy." },
      { question: "Can I combine PDFs on my mobile phone?", answer: "Yes, Fylora's web tools are fully responsive. You can upload and merge PDF documents instantly using standard mobile browsers on iOS or Android devices." },
      { question: "Do I need to sign up to merge documents?", answer: "No, Fylora requires zero account creation or sign-ups. You can merge an unlimited number of PDF documents entirely for free without logging in." },
      { question: "Does merging PDFs reduce quality?", answer: "No, combining PDF documents via Fylora strictly merges the existing data streams without re-rendering or compressing, preserving 100% of the original visual quality." }
    ]
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    description: "Extract pages or split into separate files",
    icon: Scissors,
    category: "core",
    color: "bg-primary",
    seoTitle: "Split PDF Pages Online & Extract Files | Fylora",
    seoContent: "Extract exactly the pages you need with Fylora's Free Split PDF tool. Whether you are dealing with a massive ebook, a lengthy legal contract, or a grouped invoice file, splitting your document allows you to focus on what matters. Our browser-based processing guarantees that your sensitive documents remain strictly on your device. Separate pages into individual files or extract a specific page range instantly. Fylora provides a fast, secure, and ad-free experience, making PDF splitting seamless for students and businesses alike.",
    seoDefinition: "Split PDF is an online utility that enables users to separate a single multi-page PDF document into distinct, individual files.",
    seoQuickAnswer: "To instantly split a PDF, use Fylora's Split PDF tool. Simply upload your document, choose the pages you want to extract, and download the separated files directly to your device.",
    seoSteps: [
      { name: "Upload PDF", description: "Select the multi-page PDF document you wish to split." },
      { name: "Select Pages", description: "Specify the exact page ranges or individual pages to extract." },
      { name: "Download Extracted PDF", description: "Process the document and download a zip file containing the separated PDF pages." }
    ],
    seoFaqs: [
      { question: "How do I split a PDF file?", answer: "Upload your file to Fylora's Split tool, input the page numbers you wish to isolate, and click process. The tool extracts those pages and provides a secure download link." },
      { question: "Can I extract just one page from a PDF?", answer: "Absolutely. You can set the page range strictly to a single page (e.g., page 5 to 5) to save just that isolated page as a new document." },
      { question: "Is my split document uploaded to the cloud?", answer: "No. The splitting engine runs locally inside your web browser. Fylora never views, uploads, or stores your private documents." },
      { question: "Does splitting a file alter the original PDF?", answer: "No, the original PDF file remains completely unchanged on your computer. The split files are generated as brand-new downloaded copies." },
      { question: "Is this tool free without watermarks?", answer: "Yes, our Split PDF tool is 100% free, requires no sign-up, and never forces restrictive watermarks onto your extracted pages." }
    ]
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    icon: Minimize2,
    category: "core",
    color: "bg-primary",
    seoTitle: "Compress PDF Online - Reduce File Size Free | Fylora",
    seoContent: "Struggling with email attachment limits? Fylora's Compress PDF tool significantly reduces the file size of your documents while preserving crucial visual quality. By utilizing advanced client-side compression algorithms, your files are optimized completely within your browser, ensuring complete privacy. No uploads, no waiting in queues, and no exposed data. Choose between balanced or maximum compression levels depending on your needs. Perfect for compressing heavy portfolios, scanned documents, and image-rich presentations quickly and securely.",
    seoDefinition: "Compress PDF is an online optimization tool used to dramatically shrink the file size of heavy PDF documents while attempting to retain visual quality.",
    seoQuickAnswer: "The most secure way to reduce a PDF file size is with Fylora's Compression tool. Upload your document, select your compression level, and instantly download a lightweight file without any data leaving your device.",
    seoSteps: [
      { name: "Upload Large PDF", description: "Drag and drop the heavy PDF file you need to make smaller." },
      { name: "Select Compression Level", description: "Choose between low, balanced, or high compression depending on quality needs." },
      { name: "Download Shrinked PDF", description: "Instantly download the newly compressed, lightweight PDF file." }
    ],
    seoFaqs: [
      { question: "How do I reduce a PDF file size for emailing?", answer: "Use Fylora's Compress PDF tool. Upload your large file, pick 'High Compression', and the tool will instantly shrink the file size enough to bypass standard email attachment limits." },
      { question: "Will compressing a PDF make it blurry?", answer: "It depends on the compression level. Fylora's 'Balanced' mode intelligently retains text sharpness while shrinking images, ensuring the compressed document remains professional and readable." },
      { question: "Is my compressed data secure?", answer: "Yes. All compression logic operates locally on your machine. Fylora never uploads your sensitive documents to remote servers to compress them." },
      { question: "Can I compress a PDF on a Mac for free?", answer: "Yes, Fylora's web tools function flawlessly on Safari on macOS. You can compress PDFs without installing any heavy desktop applications." },
      { question: "What is the maximum file size for compression?", answer: "Because Fylora processes files locally using your computer's RAM, there are theoretically no strict file size limits; it handles massive files smoothly." }
    ]
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to Image",
    description: "Convert PDF pages to high-quality images",
    icon: Image,
    category: "convert",
    color: "bg-primary",
    seoTitle: "Convert PDF to JPG/PNG Images Free | Fylora",
    seoContent: "Transform your PDF documents into high-quality image files instantly with Fylora. Our PDF to JPG/PNG converter is designed for creators, designers, and professionals who need to extract visual assets or share documents as images. Everything happens securely on your own device—no data is ever uploaded to external servers. This unparalleled commitment to privacy means you can securely convert confidential briefings, design mockups, and financial statements to image formats without a second thought. Fast, free, and perfectly ad-free.",
    seoDefinition: "PDF to Image is an online conversion utility that extracts standard PDF document pages and rasterizes them into individual, high-quality JPG or PNG picture files.",
    seoQuickAnswer: "Convert PDF pages to images securely by uploading them to Fylora's PDF to Image converter. The tool renders your pages locally and lets you download a zipped folder of sharp JPGs instantly.",
    seoSteps: [
      { name: "Upload PDF", description: "Select the document you want to convert into images." },
      { name: "Process Conversion", description: "The local engine will rasterize the document pages into individual images." },
      { name: "Download Images", description: "Download a ZIP package containing all your new image files." }
    ],
    seoFaqs: [
      { question: "How do I selectively convert PDF pages to images?", answer: "Simply upload your PDF to Fylora's converter. It will automatically process the document, providing you with a download containing every page converted into individual high-quality images." },
      { question: "Are the converted pictures high quality?", answer: "Yes, Fylora renders the PDF pages at a high DPI, ensuring that the resulting image files remain perfectly legible and retain layout sharpness." },
      { question: "Can I convert PDFs to PNG instead of JPG?", answer: "Fylora's underlying engine supports high-quality rasterization, primarily outputting universally compatible image archives format suited for general web use." },
      { question: "Is this safe for confidential invoices?", answer: "Absolutely. Because the PDF to image rasterization explicitly takes place entirely in your web browser, your invoices are completely private and never uploaded." },
      { question: "Do I have to pay to convert multiple pages?", answer: "No. Fylora's image conversion tools are entirely free and do not restrict the number of pages you can convert across your documents." }
    ]
  },
  {
    id: "jpg-to-pdf",
    name: "Image to PDF",
    description: "Create PDF from images",
    icon: ImagePlus,
    category: "convert",
    color: "bg-primary",
    seoTitle: "Convert JPG to PDF - Image to PDF Converter | Fylora",
    seoContent: "Easily combine multiple images into a single, professional PDF document using Fylora's Image to PDF tool. Whether you are archiving receipts, building a photography portfolio, or compiling scanned notes, this utility handles the task securely and instantly in your browser. Because Fylora runs client-side, your personal photographs and sensitive image data are completely safe and never uploaded. Organize and convert your JPG and PNG files into a clean PDF format ready for printing or emailing without dealing with intrusive ads.",
    seoDefinition: "Image to PDF is a browser-based tool that takes multiple static images (JPG, PNG) and bundles them securely into a single, universally readable PDF document.",
    seoQuickAnswer: "To convert images to a PDF, upload your JPG or PNG files to Fylora's Image to PDF tool. Reorder them if needed, and instantly download them combined into one clean PDF document.",
    seoSteps: [
      { name: "Select Images", description: "Upload one or multiple JPG/PNG picture files from your device." },
      { name: "Sort Order", description: "Rearrange the images so they appear in the preferred sequence." },
      { name: "Generate PDF", description: "Click compile to merge the photos into a single PDF download." }
    ],
    seoFaqs: [
      { question: "How do I make a PDF out of pictures?", answer: "Upload your image files into Fylora's Image to PDF converter. You can rearrange their order using the interface, then hit process to download them compiled as a single PDF page." },
      { question: "Does converting images to PDF reduce quality?", answer: "No, Fylora embeds your native images directly into the PDF container without applying destructive downscaling, preserving your original photo quality." },
      { question: "Can I convert phone photos to PDF?", answer: "Yes, simply navigate to the Fylora site on your phone's browser, select the photos from your camera roll, and it will generate the PDF instantly." },
      { question: "Are my personal pictures uploaded?", answer: "Your photos strictly remain on your device. Fylora uses client-side rendering so the PDF is generated using your computer's local processing securely." },
      { question: "Is there a limit on how many images I can convert?", answer: "Fylora places no artificial limits on conversions, allowing you to bundle large sets of scanned documents or photo archives seamlessly for free." }
    ]
  },
  {
    id: "rotate-pdf",
    name: "Rotate PDF",
    description: "Rotate pages in any direction",
    icon: RotateCw,
    category: "core",
    color: "bg-primary",
    seoTitle: "Rotate PDF Pages Online Free | Fylora",
    seoContent: "Scanned your document upside down? Fylora's Rotate PDF tool provides a quick, secure way to fix document orientation directly within your browser. Select specific pages or rotate the entire document 90, 180, or 270 degrees clockwise. Since our PDF tools operate via WebAssembly locally on your device, you avoid slow upload times and data privacy risks. Rotate legal documents, academic papers, and private invoices confidently, knowing that your files remain 100% private.",
    seoDefinition: "Rotate PDF is an online utility designed to permanently correct the orientation of upside-down or sideways pages in a PDF document.",
    seoQuickAnswer: "Fix upside-down PDF files quickly using Fylora. Upload the document, select a 90° or 180° rotation angle, and instantly download the properly oriented PDF document privately.",
    seoSteps: [
      { name: "Upload Document", description: "Select the PDF file containing pages that are sideways or upside down." },
      { name: "Choose Angle", description: "Select whether you want to rotate the pages 90, 180, or 270 degrees." },
      { name: "Download Fix", description: "Process the layout shifts and instantly download the permanently rotated document." }
    ],
    seoFaqs: [
      { question: "How do I permanently rotate a PDF?", answer: "Upload your document to Fylora's Rotate PDF tool. Select your desired rotation angle (like 90° clockwise) from the options, click process, and download the permanently fixed file." },
      { question: "Can I rotate just one page instead of all of them?", answer: "Currently, the core tool rotates the structural orientation of the uploaded files seamlessly. For advanced page manipulation, you can split, rotate, and re-merge documents securely." },
      { question: "Is this permanent or just a viewer rotation?", answer: "This tool inherently rewrites the orientation matrices of the PDF file, ensuring the rotation is permanently saved when you open it in any future viewer." },
      { question: "Is it safe to upload financial documents to rotate?", answer: "Yes, because Fylora never actually uploads your file. The rotation calculation runs via JavaScript securely inside your local internet browser." },
      { question: "Will rotating mess up invisible text layers?", answer: "No, Fylora properly transforms the document's structure alongside the visual layout, maintaining the integrity of all text and OCR layers perfectly." }
    ]
  },
  {
    id: "reorder-pdf",
    name: "Reorder Pages",
    description: "Drag and drop to rearrange pages",
    icon: ArrowUpDown,
    category: "core",
    color: "bg-primary",
    seoTitle: "Reorder PDF Pages Instantly Online | Fylora",
    seoContent: "Take control of your document structure with Fylora's Reorder PDF Pages utility. Quickly organize the flow of your report or presentation by dragging and dropping pages into the correct sequence. There's no need to download clunky desktop software; our browser-based tool allows you to rearrange pages securely and instantly. Ideal for fixing collation errors or restructuring imported records, our entirely client-side processing guarantees that your organized files stay perfectly private.",
    seoDefinition: "Reorder PDF is a visual organizational tool that lets users drag and drop to shift the sequence of individual pages within an existing PDF file.",
    seoQuickAnswer: "To reorder pages in a PDF, upload your document to Fylora, use the visual interface to shift files into your preferred sequence, and download the newly structured PDF instantly.",
    seoSteps: [
      { name: "Select File", description: "Upload the PDF document that needs to be reorganized." },
      { name: "Drag and Drop", description: "Shift the page sequence dynamically via the secure interface if splitting/merging." },
      { name: "Save Changes", description: "Download the freshly collated PDF to your computer." }
    ],
    seoFaqs: [
      { question: "How do I change the page order of a PDF file?", answer: "You can easily reorganize PDF structures using Fylora's processing limits constraint tools. Simply sequence your documents carefully and download the final collated file." },
      { question: "Does reordering pages alter the file size?", answer: "Reordering pages natively merely changes the internal sequence indexing of the PDF. The overall file size remains functionally identical to the original." },
      { question: "Are my documents read by human reviewers?", answer: "No. In fact, your documents never even leave your computer network. Fylora's algorithms run securely utilizing local browser architecture." },
      { question: "Can I move a page from the end to the beginning?", answer: "Yes, the reordering tools permit entirely flexible structuring, allowing drastic jumps in sequence positioning instantly." },
      { question: "Is rearranging PDF pages free?", answer: "Fylora offers this suite of structural document reorganization entirely for free without premium paywalls or mandatory logins." }
    ]
  },
  {
    id: "watermark-pdf",
    name: "Add Watermark",
    description: "Add text or image watermarks",
    icon: Droplets,
    category: "core",
    color: "bg-primary",
    seoTitle: "Add Watermark to PDF Free | Protect Documents | Fylora",
    seoContent: "Protect your intellectual property effortlessly by stamping your documents using Fylora's PDF Watermark tool. Add customized text like 'CONFIDENTIAL' or 'DRAFT' across your pages to prevent unauthorized distribution. Because Fylora focuses intensely on data security through zero-upload client-side processing, you can confidently watermark your most proprietary business proposals and sensitive drafts without risking interception on cloud servers. Add watermarks securely, accurately, and free of charge.",
    seoDefinition: "A PDF Watermark tool applies a faded, semi-transparent text or image overlay onto document pages, used to denote confidentiality or establish copyright ownership.",
    seoQuickAnswer: "To add a watermark securely, upload your PDF to Fylora. Type your custom watermark text like 'CONFIDENTIAL', set the tool, and download your stamped document privately.",
    seoSteps: [
      { name: "Upload PDF", description: "Select the document you wish to stamp." },
      { name: "Type Watermark", description: "Enter your desired watermark text, such as 'DRAFT'." },
      { name: "Apply & Download", description: "Render the watermark and download your protected document." }
    ],
    seoFaqs: [
      { question: "How do I type 'Draft' across a PDF?", answer: "Upload your document to Fylora's Watermark tool. Type the word 'Draft' into the watermark text box, click process, and the tool will stamp it diagonally across your pages." },
      { question: "Is the watermark permanent?", answer: "Yes, Fylora embeds the watermark deep into the structural layers of the PDF file, making it highly irritating for unauthorized parties to simply delete it." },
      { question: "Can I watermark private legal contracts safely?", answer: "Absolutely. Fylora's defining feature is that files are never uploaded. Your watermarking processing takes place 100% locally on your computer." },
      { question: "Will the watermark cover up important text?", answer: "No, standard watermarks are rendered with careful transparency offsets, ensuring that the primary document text underneath remains completely legible." },
      { question: "Is Fylora's watermark tool free?", answer: "Yes. Many tools charge for premium security formatting, but Fylora provides unrestricted watermarking functionality for free." }
    ]
  },
  {
    id: "protect-pdf",
    name: "Protect PDF",
    description: "Add password protection to your PDF",
    icon: Lock,
    category: "core",
    color: "bg-primary",
    seoTitle: "Password Protect PDF Documents Free | Fylora",
    seoContent: "Secure your high-stakes documents before emailing them using Fylora's Protect PDF feature. By applying rugged encryption algorithms and a strong password, you guarantee that only intended recipients possess the keys to your files. The best part? The encryption happens instantly on your own computer. Because your unencrypted files never leave your device, Fylora eliminates the risk of cloud breaches, making it the safest way to lock tax returns, medical records, and legal drafts.",
    seoDefinition: "Protect PDF is a security tool that encrypts a document file format with a custom user password, rendering the file unreadable to anyone without the key.",
    seoQuickAnswer: "To password protect a PDF file instantly, upload the document to Fylora's Protect tool. Enter a secure password in the prompt, and download your newly encrypted file.",
    seoSteps: [
      { name: "Upload Unsecured PDF", description: "Select the private file you need to lock." },
      { name: "Set Password", description: "Type a strong, memorable password into the security options prompt." },
      { name: "Download Encrypted PDF", description: "Click process and download your locked document." }
    ],
    seoFaqs: [
      { question: "How can I put a password on a PDF file?", answer: "You can lock any PDF by uploading it to Fylora's Protect PDF tool. Type your desired password, hit process, and the tool encrypts the file before giving you the secure download link." },
      { question: "What type of encryption is used?", answer: "Modern PDF password utilities apply robust AES security standards, ensuring that brute-forcing the document without the password is computationally improbable." },
      { question: "Does Fylora store my password?", answer: "No. The password you type is handled dynamically in your local browser state to encrypt the file and is completely destroyed the second you refresh the page." },
      { question: "Will password protecting it prevent printing?", answer: "Standard password protection strictly prevents opening the document. Once verified, general printing features rely on user-level permissions." },
      { question: "Can my employer bypass the password?", answer: "If a rigorous, complex password is set, the document remains utterly locked to all parties—including software administrators—unless they know the exact key." }
    ]
  },
  {
    id: "unlock-pdf",
    name: "Unlock PDF",
    description: "Remove password from protected PDFs",
    icon: Unlock,
    category: "core",
    color: "bg-primary",
    seoTitle: "Unlock PDF - Remove PDF Password Online | Fylora",
    seoContent: "Gain full access to documents you already own by stripping away cumbersome passwords with Fylora's Unlock PDF tool. If you have the legitimate password but want to remove the encryption for easier future access, this client-side utility does it instantly. Keeping your files completely secure, the decryption process takes place within the browser, meaning your unlocked document and your password are never transmitted over the internet or saved on our servers.",
    seoDefinition: "Unlock PDF is a decryption utility that permanently removes the password barrier from a secured PDF file, assuming the user knows the original unlocking password.",
    seoQuickAnswer: "To permanently remove a password from a PDF you own, upload it to Fylora's Unlock tool. Enter the correct current password, and instantly download an unsecured copy.",
    seoSteps: [
      { name: "Upload Locked PDF", description: "Select the encrypted document you want to unprotect." },
      { name: "Enter Current Password", description: "Input the known valid password to authorize the decryption." },
      { name: "Download Unlocked PDF", description: "Download the file, which is now permanently unlocked for easy access." }
    ],
    seoFaqs: [
      { question: "How do I remove the password from a PDF?", answer: "Upload the secured PDF to Fylora, enter the valid unlocking password into the provided prompt, and process it. The downloaded file will no longer require a password to open." },
      { question: "Can Fylora hack a PDF if I forgot the password?", answer: "No. Fylora is a secure utility, not a hacking tool. You must know the existing valid password to authorize the permanent unlocking of the file structure." },
      { question: "Is the unlocking process safe for banking statements?", answer: "Yes, because the decryption occurs entirely client-side. The unencrypted file data never touches the internet, eliminating intercept risks entirely." },
      { question: "Why do I need to enter the password?", answer: "Entering the password proves you are the authorized owner of the document and provides the localized system the cryptographic key necessary to strip the security wrapper." },
      { question: "Is removing a PDF password free?", answer: "Yes, Fylora provides unrestricted secure decrypting capabilities completely free of charge." }
    ]
  },
  {
    id: "pdf-to-word",
    name: "PDF to Text",
    description: "Extract plain text from PDF files",
    icon: FileType,
    category: "convert",
    color: "bg-primary",
    seoTitle: "Convert PDF to Text & Word Free | Fylora",
    seoContent: "Easily extract editable text from standard PDF documents using Fylora's rapid PDF to Text utility. Whether you need to copy-paste passages from a locked research paper or pull text from a financial report, our 100% private, browser-based extraction engine makes it instantaneous. Unlike other tools that read and store your documents remotely, Fylora processes text extraction locally on your hardware, protecting your sensitive content at all times. A reliable, ad-free alternative for content retrieval.",
    seoDefinition: "PDF to Text is an extraction tool designed to strip away images and formatting from a PDF document, delivering a raw, easily editable plain text file.",
    seoQuickAnswer: "To extract text from a PDF quickly, use Fylora's PDF to Text converter. Upload your document, and the tool will instantly pull all readable text into a clean .txt file locally.",
    seoSteps: [
      { name: "Upload PDF", description: "Select the document you wish to extract content from." },
      { name: "Process Content", description: "The local engine scans the file and strips all raw string data." },
      { name: "Download Text File", description: "Download the resulting plain text (.txt) file for editing." }
    ],
    seoFaqs: [
      { question: "How do I convert a PDF to an editable text format?", answer: "Simply upload your PDF into Fylora's PDF to Text converter. The browser-engine extracts the structural text strings and provides an immediate download of an editable .txt file." },
      { question: "Will this tool recreate exact Word layouts?", answer: "No, this specific tool is designed to cleanly extract pure, raw text strings, intentionally dropping complex visual formatting, images, and heavy layout tables for streamlined editing." },
      { question: "Does this work on scanned image documents?", answer: "Standard text extraction cannot read flattened images. For scanned physical documents, you should use Fylora's OCR Extract tool instead to intelligently read the text." },
      { question: "Are my documents being read by AI on the cloud?", answer: "No. Fylora runs extraction logic locally inside your browser cache. Your documents, and the extracted text, are never communicated to any external servers." },
      { question: "Is there a page limit for text conversion?", answer: "There are no arbitrary page limits. The engine processes the extraction efficiently using your local device processing capabilities." }
    ]
  },
  {
    id: "pdf-to-md",
    name: "PDF to Markdown",
    description: "Convert PDF content to Markdown",
    icon: FileCode,
    category: "convert",
    color: "bg-primary",
    seoTitle: "Convert PDF to Markdown (MD) Format | Fylora",
    seoContent: "Developers and content creators can quickly export document content into web-ready formats using our PDF to Markdown converter. Fylora precisely extracts text and attempts to preserve semantic structure, outputting clean, highly usable .md files for GitHub readmes, blogs, and documentation sites. Enjoy completely private conversions driven entirely by your browser's processing power. No arbitrary upload limits, no wait times, and zero privacy compromises.",
    seoDefinition: "PDF to Markdown is a specialized conversion tool used by developers to translate PDF text structures directly into lightweight, web-compatible markdown syntax.",
    seoQuickAnswer: "Convert your PDF to Markdown easily with Fylora. Upload the file, and our tool seamlessly extracts text into web-ready formatting, giving you an instant .md file download.",
    seoSteps: [
      { name: "Select PDF", description: "Upload the document you want formatted for the web." },
      { name: "Convert Structure", description: "Allow the tool to quickly translate headers and paragraphs." },
      { name: "Download MD File", description: "Download your freshly generated markdown document." }
    ],
    seoFaqs: [
      { question: "What is PDF to Markdown conversion?", answer: "It is a process where the text within a PDF is extracted and intelligently wrapped in markdown syntax markers (like # for headers), making the copy instantly usable for coding libraries or blogs." },
      { question: "Will the converter preserve deep code blocks?", answer: "The extraction accurately pulls plain text. Complex nested code blocks may require minor manual syntax adjustment depending on the original PDF's invisible formatting structures." },
      { question: "Is Fylora's Markdown tool free?", answer: "Yes, our PDF to Markdown utility is 100% free with no registration walls or hidden charges." },
      { question: "Why is converting to Markdown useful?", answer: "Markdown is a universal plain-text formatting language. It is incredibly useful for developers migrating documentation to GitHub, Notion, or static site generators like Next.js." },
      { question: "Does the conversion risk my data privacy?", answer: "Absolutely not. The translation mechanism runs functionally within your computer browser, meaning sensitive proprietary documentation maintains perfect zero-upload privacy." }
    ]
  },
  {
    id: "ocr-pdf",
    name: "OCR Extract",
    description: "Extract text from scanned documents",
    icon: ScanSearch,
    category: "advanced",
    color: "bg-primary",
    seoTitle: "Free PDF OCR - Extract Text from Scans | Fylora",
    seoContent: "Turn flat, scanned images back into searchable, selectable data with Fylora's robust Optical Character Recognition (OCR) tool. Utilizing powerful client-side AI modules, Fylora inspects images within your PDF and intelligently pulls out raw text. Ideal for digitizing old physical receipts, historical documents, and printed classroom handouts. By keeping the OCR process running deeply within your local machine, we provide a uniquely privacy-first solution to data extraction.",
    seoDefinition: "Optical Character Recognition (OCR) is an advanced tool that intelligently scans 'flat' images of text (like scanned paper) and translates it back into selectable, editable digital text.",
    seoQuickAnswer: "To extract text from scanned images safely, upload the file to Fylora's OCR Extract tool. It will locally scan the image patterns and output the text directly for you to copy or edit.",
    seoSteps: [
      { name: "Upload Scanned PDF", description: "Select the image-heavy or manually scanned document." },
      { name: "Initialize OCR", description: "Permit the secure local AI engine to read the visual data." },
      { name: "Extract Results", description: "Download or copy the newly recognized text strings." }
    ],
    seoFaqs: [
      { question: "How do I extract text from a scanned picture?", answer: "Upload your scanned PDF document to Fylora's OCR tool. The Optical Character Recognition engine visually 'reads' the images and spits out a clean text file you can directly interact with." },
      { question: "Does OCR work on handwritten notes?", answer: "While OCR algorithms are excellent at reading printed text formats (like receipts and standard books), highly complex or messy cursive handwriting may have reduced accuracy." },
      { question: "Is it safe to run OCR on bank statements?", answer: "Fylora's OCR operations are deliberately executed strictly on the client-side (your device), making it exceptionally safe to scan highly sensitive, unredacted financial records without upload risks." },
      { question: "Is the OCR tool extremely accurate?", answer: "Modern OCR heavily relies on localized AI image-scanning patterns. If your scanned document has high contrast and is reasonably sharp, the extraction accuracy is exceptionally high." },
      { question: "Why is Fylora's OCR better than cloud engines?", answer: "Cloud engines force you to upload your sensitive data to massive enterprise servers. Fylora's localized approach grants you AI-tier extraction while guaranteeing total 100% data privacy." }
    ]
  },
  {
    id: "annotate-pdf",
    name: "Annotate PDF",
    description: "Add highlights, underlines, and comments",
    icon: Highlighter,
    category: "advanced",
    color: "bg-primary",
    seoTitle: "Annotate & Edit PDF Online Free | Fylora",
    seoContent: "Review documents dynamically by utilizing Fylora's secure Annotate PDF tool. Add bright highlights to critical paragraphs, underline mistakes, or drop text comments directly onto the document. This feature acts as a private, fast PDF editor designed for students studying course materials or professionals marking up contract revisions. Since all rendering and editing are performed actively on your device, your private intellectual property is never exposed to external networks.",
    seoDefinition: "Annotate PDF is a robust markup utility allowing users to dynamically interact with text by drawing highlights, striking through words, or appending personal comments.",
    seoQuickAnswer: "To markup a document, upload it to Fylora's Annotate PDF tool, set your search parameters to apply highlights or underlines, and download the freshly edited file cleanly.",
    seoSteps: [
      { name: "Upload Draft", description: "Select the document you need to markup or study." },
      { name: "Apply Markup Parameters", description: "Choose to highlight or underline, and set the target text." },
      { name: "Download Edited File", description: "Save the document securely with the new annotations intact." }
    ],
    seoFaqs: [
      { question: "How do you highlight text in a PDF online?", answer: "Use Fylora's precise Annotate tool. Upload your reading material, define the text strings you want to draw attention to, choose 'Highlight' style, and process the file to cleanly append the edits." },
      { question: "Can I use this as a free PDF editor?", answer: "While it doesn't dynamically modify the underlying raw text flow, it acts as a highly effective free editor for visually reviewing, crossing out, and spotlighting critical passages." },
      { question: "Do my edits stay saved if I email the file?", answer: "Yes. Fylora processes standardized PDF highlight and annotation layers perfectly, meaning anyone opening your downloaded file in Adobe Reader or Chrome will see your edits." },
      { question: "Is this safe for sensitive client revisions?", answer: "Yes, all annotations are applied using your computer's local resources. Fylora prevents any third-party risk inherently since your drafts are 0% cloud-dependent." },
      { question: "Are watermarks added during the edit?", answer: "No, Fylora explicitly refuses to inject arbitrary mandatory watermarks into your professionally edited business documents." }
    ]
  },
  {
    id: "redact-pdf",
    name: "Redact PDF",
    description: "Permanently remove sensitive content",
    icon: EyeOff,
    category: "advanced",
    color: "bg-primary",
    seoTitle: "Redact PDF - Blackout Sensitive Information | Fylora",
    seoContent: "Permanently blackout classified or personally identifiable information using Fylora's rigorous Redact PDF tool. Drawing black boxes over text in basic editors often leaves the underlying text searchable—Fylora ensures the data is thoroughly and irreversibly stripped from the file code. Because this operation requires handling highly sensitive details like Social Security Numbers or banking info, our strictly client-side processing is the only truly safe way to sanitize your documents online.",
    seoDefinition: "Redact PDF is a vital security operation that completely destroys visible and invisible underlying sensitive text data, replacing it with an unreadable black bar block.",
    seoQuickAnswer: "To safely blackout information permanently, upload your file to Fylora's Redact tool. Define the exact sensitive phrases, process locally, and download a permanently sanitized document without remote tracking.",
    seoSteps: [
      { name: "Upload Secure File", description: "Select the legal or financial document harboring sensitive data." },
      { name: "Confirm Redactions", description: "Declare the exact strings heavily needing removal." },
      { name: "Download Sanitized Doc", description: "Securely download the file, perfectly stripped of the listed data elements." }
    ],
    seoFaqs: [
      { question: "How do I safely blackout text on a PDF document?", answer: "Do not just draw a black box! Use Fylora's specialized Redact PDF tool. It intelligently targets your specified text strings and completely removes the underlying data code, guaranteeing it cannot be highlighted or scraped." },
      { question: "Is redacting online safe with Fylora?", answer: "Fylora provides the ONLY undeniably safe way to redact files online: true zero-upload client-side processing. Your SSN, PII, and financial data is completely sanitized locally against your own browser architecture." },
      { question: "Can the redaction be undone later?", answer: "No. Proper redaction permanently alters the internal PDF stream layout. You must keep a secure backup of the original unedited file, because the downloaded redacted copy cannot be reverse-engineered." },
      { question: "Why is simply drawing a shape over text dangerous?", answer: "Standard PDF editors layer visual shapes over text. If a user simply selects 'Copy All Text', the document still possesses and readily hands over the hidden text beneath the shapes. True redaction deletes the text string thoroughly." },
      { question: "Does this cost money for high-security environments?", answer: "Fylora commits to privacy universally; our stringent client-side redaction utility is absolutely free, ensuring secure digital sanitization is accessible to everyone." }
    ]
  }
];

export const getToolById = (id: string) => tools.find(t => t.id === id);
