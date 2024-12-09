import React from 'react';
import StudentImage from '../../assets/images/student.png';
import { Link } from 'react-router-dom';

const SubmitIcon: React.FC<{ className?: string }> = () => (
    <svg width="283" height="67" viewBox="0 0 283 67" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 9C1 4.58172 4.58172 1 9 1H274C278.418 1 282 4.58172 282 9V57C282 61.4183 278.418 65 274 65H9C4.58172 65 1 61.4183 1 57V9Z" fill="#21B6F8"/>
    <path d="M0.5 9C0.5 4.30558 4.30558 0.5 9 0.5H274C278.694 0.5 282.5 4.30558 282.5 9H281.5C281.5 4.85786 278.142 1.5 274 1.5H9C4.85786 1.5 1.5 4.85786 1.5 9H0.5ZM282.5 58.5C282.5 63.1944 278.694 67 274 67H9C4.30558 67 0.5 63.1944 0.5 58.5L1.5 57C1.5 60.3137 4.85786 63 9 63H274C278.142 63 281.5 60.3137 281.5 57L282.5 58.5ZM9 67C4.30558 67 0.5 63.1944 0.5 58.5V9C0.5 4.30558 4.30558 0.5 9 0.5V1.5C4.85786 1.5 1.5 4.85786 1.5 9V57C1.5 60.3137 4.85786 63 9 63V67ZM274 0.5C278.694 0.5 282.5 4.30558 282.5 9V58.5C282.5 63.1944 278.694 67 274 67V63C278.142 63 281.5 60.3137 281.5 57V9C281.5 4.85786 278.142 1.5 274 1.5V0.5Z" fill="#009BD5"/>
    <path d="M40.464 41.192C39.968 41.192 39.584 41.056 39.312 40.784C39.056 40.496 38.928 40.104 38.928 39.608V26.648H34.248C33.832 26.648 33.504 26.536 33.264 26.312C33.04 26.072 32.928 25.752 32.928 25.352C32.928 24.936 33.04 24.624 33.264 24.416C33.504 24.192 33.832 24.08 34.248 24.08H46.68C47.096 24.08 47.416 24.192 47.64 24.416C47.88 24.624 48 24.936 48 25.352C48 25.752 47.88 26.072 47.64 26.312C47.416 26.536 47.096 26.648 46.68 26.648H42V39.608C42 40.104 41.872 40.496 41.616 40.784C41.36 41.056 40.976 41.192 40.464 41.192ZM51.4553 41.24C50.6073 41.24 49.8473 41.08 49.1753 40.76C48.5193 40.424 47.9993 39.976 47.6152 39.416C47.2473 38.856 47.0633 38.224 47.0633 37.52C47.0633 36.656 47.2873 35.976 47.7353 35.48C48.1833 34.968 48.9113 34.6 49.9193 34.376C50.9273 34.152 52.2793 34.04 53.9753 34.04H55.1753V35.768H53.9993C53.0073 35.768 52.2153 35.816 51.6233 35.912C51.0313 36.008 50.6073 36.176 50.3513 36.416C50.1113 36.64 49.9913 36.96 49.9913 37.376C49.9913 37.904 50.1753 38.336 50.5433 38.672C50.9113 39.008 51.4233 39.176 52.0793 39.176C52.6073 39.176 53.0713 39.056 53.4713 38.816C53.8873 38.56 54.2153 38.216 54.4553 37.784C54.6953 37.352 54.8153 36.856 54.8153 36.296V33.536C54.8153 32.736 54.6393 32.16 54.2873 31.808C53.9353 31.456 53.3433 31.28 52.5113 31.28C52.0473 31.28 51.5433 31.336 50.9993 31.448C50.4713 31.56 49.9113 31.752 49.3193 32.024C49.0153 32.168 48.7433 32.208 48.5033 32.144C48.2793 32.08 48.1033 31.952 47.9753 31.76C47.8473 31.552 47.7833 31.328 47.7833 31.088C47.7833 30.848 47.8473 30.616 47.9753 30.392C48.1033 30.152 48.3193 29.976 48.6233 29.864C49.3593 29.56 50.0633 29.344 50.7353 29.216C51.4233 29.088 52.0473 29.024 52.6073 29.024C53.7593 29.024 54.7033 29.2 55.4393 29.552C56.1913 29.904 56.7513 30.44 57.1193 31.16C57.4873 31.864 57.6713 32.776 57.6713 33.896V39.656C57.6713 40.152 57.5513 40.536 57.3113 40.808C57.0713 41.064 56.7273 41.192 56.2793 41.192C55.8313 41.192 55.4793 41.064 55.2233 40.808C54.9833 40.536 54.8633 40.152 54.8633 39.656V38.504H55.0553C54.9433 39.064 54.7193 39.552 54.3833 39.968C54.0633 40.368 53.6553 40.68 53.1593 40.904C52.6633 41.128 52.0953 41.24 51.4553 41.24ZM62.2043 41.192C61.7243 41.192 61.3563 41.064 61.1003 40.808C60.8443 40.536 60.7163 40.152 60.7163 39.656V25.4C60.7163 24.904 60.8443 24.528 61.1003 24.272C61.3563 24.016 61.7243 23.888 62.2043 23.888C62.6843 23.888 63.0523 24.016 63.3083 24.272C63.5803 24.528 63.7163 24.904 63.7163 25.4V34.256H63.7643L67.7243 30.08C68.0443 29.76 68.3243 29.512 68.5643 29.336C68.8043 29.16 69.1323 29.072 69.5483 29.072C69.9643 29.072 70.2763 29.184 70.4843 29.408C70.7083 29.616 70.8203 29.872 70.8203 30.176C70.8203 30.48 70.6763 30.784 70.3883 31.088L66.2122 35.504V34.256L70.7963 39.2C71.0843 39.504 71.2123 39.816 71.1803 40.136C71.1643 40.44 71.0363 40.696 70.7963 40.904C70.5563 41.096 70.2523 41.192 69.8843 41.192C69.4363 41.192 69.0763 41.104 68.8043 40.928C68.5483 40.752 68.2603 40.488 67.9403 40.136L63.7643 35.768H63.7163V39.656C63.7163 40.68 63.2123 41.192 62.2043 41.192ZM79.1331 41.24C77.8051 41.24 76.6611 40.992 75.7011 40.496C74.7411 40 73.9971 39.296 73.4691 38.384C72.9571 37.472 72.7011 36.392 72.7011 35.144C72.7011 33.928 72.9491 32.864 73.4451 31.952C73.9571 31.04 74.6531 30.328 75.5331 29.816C76.4291 29.288 77.4451 29.024 78.5811 29.024C79.4131 29.024 80.1571 29.16 80.8131 29.432C81.4851 29.704 82.0531 30.096 82.5171 30.608C82.9971 31.12 83.3571 31.744 83.5971 32.48C83.8531 33.2 83.9811 34.016 83.9811 34.928C83.9811 35.216 83.8771 35.44 83.6691 35.6C83.4771 35.744 83.1971 35.816 82.8291 35.816H75.1251V34.088H81.8691L81.4851 34.448C81.4851 33.712 81.3731 33.096 81.1491 32.6C80.9411 32.104 80.6291 31.728 80.2131 31.472C79.8131 31.2 79.3091 31.064 78.7011 31.064C78.0291 31.064 77.4531 31.224 76.9731 31.544C76.5091 31.848 76.1491 32.288 75.8931 32.864C75.6531 33.424 75.5331 34.096 75.5331 34.88V35.048C75.5331 36.36 75.8371 37.344 76.4451 38C77.0691 38.64 77.9811 38.96 79.1811 38.96C79.5971 38.96 80.0611 38.912 80.5731 38.816C81.1011 38.704 81.5971 38.52 82.0611 38.264C82.3971 38.072 82.6931 37.992 82.9491 38.024C83.2051 38.04 83.4051 38.128 83.5491 38.288C83.7091 38.448 83.8051 38.648 83.8371 38.888C83.8691 39.112 83.8211 39.344 83.6931 39.584C83.5811 39.824 83.3811 40.032 83.0931 40.208C82.5331 40.56 81.8851 40.824 81.1491 41C80.4291 41.16 79.7571 41.24 79.1331 41.24ZM98.2485 41.24C97.2085 41.24 96.3365 41.064 95.6325 40.712C94.9445 40.36 94.4325 39.848 94.0965 39.176C93.7605 38.488 93.5925 37.64 93.5925 36.632V31.52H92.3445C91.9605 31.52 91.6645 31.424 91.4565 31.232C91.2485 31.024 91.1445 30.744 91.1445 30.392C91.1445 30.024 91.2485 29.744 91.4565 29.552C91.6645 29.36 91.9605 29.264 92.3445 29.264H93.5925V27.08C93.5925 26.584 93.7205 26.208 93.9765 25.952C94.2485 25.696 94.6245 25.568 95.1045 25.568C95.5845 25.568 95.9525 25.696 96.2085 25.952C96.4645 26.208 96.5925 26.584 96.5925 27.08V29.264H99.1365C99.5205 29.264 99.8165 29.36 100.025 29.552C100.233 29.744 100.337 30.024 100.337 30.392C100.337 30.744 100.233 31.024 100.025 31.232C99.8165 31.424 99.5205 31.52 99.1365 31.52H96.5925V36.464C96.5925 37.232 96.7605 37.808 97.0965 38.192C97.4325 38.576 97.9765 38.768 98.7285 38.768C99.0005 38.768 99.2405 38.744 99.4485 38.696C99.6565 38.648 99.8405 38.616 100.001 38.6C100.193 38.584 100.353 38.648 100.481 38.792C100.609 38.92 100.673 39.192 100.673 39.608C100.673 39.928 100.617 40.216 100.505 40.472C100.409 40.712 100.225 40.88 99.9525 40.976C99.7445 41.04 99.4725 41.096 99.1365 41.144C98.8005 41.208 98.5045 41.24 98.2485 41.24ZM103.876 41.192C103.396 41.192 103.028 41.064 102.772 40.808C102.516 40.536 102.388 40.152 102.388 39.656V25.4C102.388 24.904 102.516 24.528 102.772 24.272C103.028 24.016 103.396 23.888 103.876 23.888C104.356 23.888 104.724 24.016 104.98 24.272C105.252 24.528 105.388 24.904 105.388 25.4V31.616H105.052C105.404 30.768 105.948 30.128 106.684 29.696C107.436 29.248 108.284 29.024 109.228 29.024C110.172 29.024 110.948 29.2 111.556 29.552C112.164 29.904 112.62 30.44 112.924 31.16C113.228 31.864 113.38 32.76 113.38 33.848V39.656C113.38 40.152 113.252 40.536 112.996 40.808C112.74 41.064 112.372 41.192 111.892 41.192C111.412 41.192 111.036 41.064 110.764 40.808C110.508 40.536 110.38 40.152 110.38 39.656V33.992C110.38 33.08 110.204 32.416 109.852 32C109.516 31.584 108.988 31.376 108.268 31.376C107.388 31.376 106.684 31.656 106.156 32.216C105.644 32.76 105.388 33.488 105.388 34.4V39.656C105.388 40.68 104.884 41.192 103.876 41.192ZM122.211 41.24C120.883 41.24 119.739 40.992 118.779 40.496C117.819 40 117.075 39.296 116.547 38.384C116.035 37.472 115.779 36.392 115.779 35.144C115.779 33.928 116.027 32.864 116.523 31.952C117.035 31.04 117.731 30.328 118.611 29.816C119.507 29.288 120.523 29.024 121.659 29.024C122.491 29.024 123.235 29.16 123.891 29.432C124.563 29.704 125.131 30.096 125.595 30.608C126.075 31.12 126.435 31.744 126.675 32.48C126.931 33.2 127.059 34.016 127.059 34.928C127.059 35.216 126.955 35.44 126.747 35.6C126.555 35.744 126.275 35.816 125.907 35.816H118.203V34.088H124.947L124.563 34.448C124.563 33.712 124.451 33.096 124.227 32.6C124.019 32.104 123.707 31.728 123.291 31.472C122.891 31.2 122.387 31.064 121.779 31.064C121.107 31.064 120.531 31.224 120.051 31.544C119.587 31.848 119.227 32.288 118.971 32.864C118.731 33.424 118.611 34.096 118.611 34.88V35.048C118.611 36.36 118.915 37.344 119.523 38C120.147 38.64 121.059 38.96 122.259 38.96C122.675 38.96 123.139 38.912 123.651 38.816C124.179 38.704 124.675 38.52 125.139 38.264C125.475 38.072 125.771 37.992 126.027 38.024C126.283 38.04 126.483 38.128 126.627 38.288C126.787 38.448 126.883 38.648 126.915 38.888C126.947 39.112 126.899 39.344 126.771 39.584C126.659 39.824 126.459 40.032 126.171 40.208C125.611 40.56 124.963 40.824 124.227 41C123.507 41.16 122.835 41.24 122.211 41.24ZM150.303 43.712C150.527 44.064 150.615 44.384 150.567 44.672C150.519 44.96 150.391 45.2 150.183 45.392C149.975 45.6 149.719 45.728 149.415 45.776C149.111 45.84 148.807 45.808 148.503 45.68C148.199 45.568 147.943 45.344 147.735 45.008L146.079 42.344C145.855 41.976 145.551 41.696 145.167 41.504C144.799 41.328 144.343 41.24 143.799 41.24L146.175 40.304C146.927 40.304 147.527 40.44 147.975 40.712C148.423 40.968 148.855 41.424 149.271 42.08L150.303 43.712ZM143.823 41.24C142.191 41.24 140.759 40.88 139.527 40.16C138.311 39.44 137.367 38.432 136.695 37.136C136.023 35.824 135.687 34.288 135.687 32.528C135.687 31.2 135.879 30.008 136.263 28.952C136.647 27.88 137.191 26.968 137.895 26.216C138.615 25.448 139.471 24.864 140.463 24.464C141.471 24.048 142.591 23.84 143.823 23.84C145.471 23.84 146.903 24.2 148.119 24.92C149.335 25.624 150.279 26.624 150.951 27.92C151.623 29.216 151.959 30.744 151.959 32.504C151.959 33.832 151.767 35.032 151.383 36.104C150.999 37.176 150.447 38.096 149.727 38.864C149.023 39.632 148.167 40.224 147.159 40.64C146.167 41.04 145.055 41.24 143.823 41.24ZM143.823 38.6C144.863 38.6 145.743 38.36 146.463 37.88C147.199 37.4 147.759 36.704 148.143 35.792C148.543 34.88 148.743 33.792 148.743 32.528C148.743 30.608 148.311 29.12 147.447 28.064C146.599 27.008 145.391 26.48 143.823 26.48C142.799 26.48 141.919 26.72 141.183 27.2C140.447 27.664 139.879 28.352 139.479 29.264C139.095 30.16 138.903 31.248 138.903 32.528C138.903 34.432 139.335 35.92 140.199 36.992C141.063 38.064 142.271 38.6 143.823 38.6ZM159.042 41.24C158.066 41.24 157.258 41.064 156.618 40.712C155.978 40.344 155.498 39.8 155.178 39.08C154.874 38.36 154.722 37.464 154.722 36.392V30.584C154.722 30.072 154.85 29.696 155.106 29.456C155.362 29.2 155.73 29.072 156.21 29.072C156.69 29.072 157.058 29.2 157.314 29.456C157.586 29.696 157.722 30.072 157.722 30.584V36.44C157.722 37.272 157.89 37.888 158.226 38.288C158.562 38.688 159.098 38.888 159.834 38.888C160.634 38.888 161.29 38.616 161.802 38.072C162.314 37.512 162.57 36.776 162.57 35.864V30.584C162.57 30.072 162.698 29.696 162.954 29.456C163.21 29.2 163.578 29.072 164.058 29.072C164.538 29.072 164.906 29.2 165.162 29.456C165.434 29.696 165.57 30.072 165.57 30.584V39.656C165.57 40.68 165.082 41.192 164.106 41.192C163.642 41.192 163.282 41.064 163.026 40.808C162.77 40.536 162.642 40.152 162.642 39.656V37.832L162.978 38.552C162.642 39.416 162.13 40.08 161.442 40.544C160.77 41.008 159.97 41.24 159.042 41.24ZM170.181 41.168C169.701 41.168 169.333 41.024 169.077 40.736C168.821 40.448 168.693 40.048 168.693 39.536V30.728C168.693 30.2 168.821 29.8 169.077 29.528C169.333 29.24 169.701 29.096 170.181 29.096C170.661 29.096 171.029 29.24 171.285 29.528C171.557 29.8 171.693 30.2 171.693 30.728V39.536C171.693 40.048 171.565 40.448 171.309 40.736C171.053 41.024 170.677 41.168 170.181 41.168ZM170.181 26.864C169.621 26.864 169.181 26.728 168.861 26.456C168.557 26.168 168.405 25.776 168.405 25.28C168.405 24.768 168.557 24.376 168.861 24.104C169.181 23.832 169.621 23.696 170.181 23.696C170.757 23.696 171.197 23.832 171.501 24.104C171.805 24.376 171.957 24.768 171.957 25.28C171.957 25.776 171.805 26.168 171.501 26.456C171.197 26.728 170.757 26.864 170.181 26.864ZM175.53 41C175.226 41 174.97 40.928 174.762 40.784C174.57 40.624 174.442 40.424 174.378 40.184C174.314 39.944 174.314 39.688 174.378 39.416C174.458 39.128 174.61 38.856 174.834 38.6L181.05 30.8V31.52H175.386C175.018 31.52 174.73 31.424 174.522 31.232C174.33 31.024 174.234 30.744 174.234 30.392C174.234 30.024 174.33 29.744 174.522 29.552C174.73 29.36 175.018 29.264 175.386 29.264H182.49C182.842 29.264 183.13 29.344 183.354 29.504C183.578 29.648 183.722 29.84 183.786 30.08C183.866 30.32 183.874 30.576 183.81 30.848C183.746 31.12 183.602 31.376 183.378 31.616L177.042 39.536V38.744H183.042C183.81 38.744 184.194 39.12 184.194 39.872C184.194 40.224 184.09 40.504 183.882 40.712C183.69 40.904 183.41 41 183.042 41H175.53ZM194.421 41.192C193.957 41.192 193.597 41.064 193.341 40.808C193.101 40.552 192.981 40.184 192.981 39.704V25.424C192.981 24.928 193.101 24.552 193.341 24.296C193.597 24.024 193.925 23.888 194.325 23.888C194.693 23.888 194.965 23.96 195.141 24.104C195.333 24.232 195.557 24.456 195.813 24.776L205.005 36.704H204.381V25.352C204.381 24.888 204.501 24.528 204.741 24.272C204.997 24.016 205.357 23.888 205.821 23.888C206.285 23.888 206.637 24.016 206.877 24.272C207.117 24.528 207.237 24.888 207.237 25.352V39.752C207.237 40.2 207.125 40.552 206.901 40.808C206.677 41.064 206.373 41.192 205.989 41.192C205.621 41.192 205.325 41.12 205.101 40.976C204.893 40.832 204.661 40.6 204.405 40.28L195.237 28.352H195.837V39.704C195.837 40.184 195.717 40.552 195.477 40.808C195.237 41.064 194.885 41.192 194.421 41.192ZM215.998 41.24C214.782 41.24 213.726 40.992 212.83 40.496C211.934 40 211.238 39.296 210.742 38.384C210.246 37.456 209.998 36.368 209.998 35.12C209.998 34.176 210.134 33.336 210.406 32.6C210.694 31.848 211.102 31.208 211.63 30.68C212.158 30.136 212.79 29.728 213.526 29.456C214.262 29.168 215.086 29.024 215.998 29.024C217.214 29.024 218.27 29.272 219.166 29.768C220.062 30.264 220.758 30.968 221.254 31.88C221.75 32.792 221.998 33.872 221.998 35.12C221.998 36.064 221.854 36.912 221.566 37.664C221.294 38.416 220.894 39.064 220.366 39.608C219.838 40.136 219.206 40.544 218.47 40.832C217.734 41.104 216.91 41.24 215.998 41.24ZM215.998 38.96C216.59 38.96 217.11 38.816 217.558 38.528C218.006 38.24 218.35 37.816 218.59 37.256C218.846 36.68 218.974 35.968 218.974 35.12C218.974 33.84 218.702 32.888 218.158 32.264C217.614 31.624 216.894 31.304 215.998 31.304C215.406 31.304 214.886 31.448 214.438 31.736C213.99 32.008 213.638 32.432 213.382 33.008C213.142 33.568 213.022 34.272 213.022 35.12C213.022 36.384 213.294 37.344 213.838 38C214.382 38.64 215.102 38.96 215.998 38.96ZM228.776 41.192C228.376 41.192 228.032 41.096 227.744 40.904C227.456 40.696 227.224 40.376 227.048 39.944L223.568 31.064C223.424 30.68 223.376 30.344 223.424 30.056C223.488 29.752 223.64 29.512 223.88 29.336C224.12 29.16 224.44 29.072 224.84 29.072C225.192 29.072 225.48 29.16 225.704 29.336C225.928 29.496 226.12 29.808 226.28 30.272L229.184 38.264H228.632L231.632 30.08C231.76 29.728 231.928 29.472 232.136 29.312C232.36 29.152 232.648 29.072 233 29.072C233.352 29.072 233.64 29.16 233.864 29.336C234.088 29.496 234.256 29.744 234.368 30.08L237.32 38.264H236.816L239.744 30.2C239.904 29.768 240.104 29.472 240.344 29.312C240.6 29.152 240.88 29.072 241.184 29.072C241.568 29.072 241.864 29.168 242.072 29.36C242.28 29.552 242.4 29.8 242.432 30.104C242.464 30.392 242.408 30.712 242.264 31.064L238.808 39.944C238.648 40.36 238.416 40.672 238.112 40.88C237.824 41.088 237.48 41.192 237.08 41.192C236.68 41.192 236.328 41.088 236.024 40.88C235.736 40.672 235.512 40.36 235.352 39.944L232.208 31.616H233.576L230.504 39.92C230.344 40.352 230.12 40.672 229.832 40.88C229.544 41.088 229.192 41.192 228.776 41.192ZM246.141 36.128C245.837 36.128 245.597 36.032 245.421 35.84C245.261 35.648 245.165 35.376 245.133 35.024L244.413 25.856C244.365 25.264 244.493 24.792 244.797 24.44C245.101 24.072 245.549 23.888 246.141 23.888C246.717 23.888 247.149 24.072 247.437 24.44C247.741 24.792 247.869 25.264 247.821 25.856L247.101 35.024C247.085 35.376 246.989 35.648 246.813 35.84C246.653 36.032 246.429 36.128 246.141 36.128ZM246.141 41.12C245.597 41.12 245.157 40.952 244.821 40.616C244.501 40.28 244.341 39.848 244.341 39.32C244.341 38.808 244.501 38.392 244.821 38.072C245.157 37.736 245.597 37.568 246.141 37.568C246.701 37.568 247.133 37.736 247.437 38.072C247.757 38.392 247.917 38.808 247.917 39.32C247.917 39.848 247.757 40.28 247.437 40.616C247.133 40.952 246.701 41.12 246.141 41.12Z" fill="#181818"/>
    </svg>
    
);

const HeroSection: React.FC = () => {
    return (
      <section className="min-h-screen bg-black">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-5 pt-32 sm:pt-40 lg:pt-56">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16">
            <div className="flex-1 text-white max-w-full lg:max-w-[594px] text-center lg:text-left">
              <h1 className="font-nunito font-bold text-[28px] sm:text-[32px] lg:text-[36px] leading-tight sm:leading-[40px] lg:leading-[44px] mb-4 sm:mb-6">
              Get engaged to learning.
              </h1>
              
              <p className="font-nunito font-normal text-[18px] sm:text-[20px] lg:text-[24px] leading-[28px] sm:leading-[30px] lg:leading-[32px] mb-8 sm:mb-12 text-white/90 px-4 sm:px-0">
             
              Take an interactive Physics quiz with AI as your mentor.
                <span className="hidden lg:inline"><br /></span>
                <span className="lg:hidden"> </span>
             
              </p>
  
             <Link to={"/select-mentor"}>
             <button className="inline-block transform scale-75 sm:scale-90 lg:scale-100 transition-transform hover:scale-[0.73] sm:hover:scale-[0.88] lg:hover:scale-[0.98] duration-200">
                <SubmitIcon />
              </button>
             </Link>
            </div>
  
            <div className="flex-1 flex justify-center lg:justify-end w-full px-4 sm:px-0 mb-8 lg:mb-0">
              <img 
                src={StudentImage}
                alt="Students Learning Physics"
                className="w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[594px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;