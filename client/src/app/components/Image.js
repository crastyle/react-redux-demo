import React, {
    PureComponent
} from 'react';
import PropTypes from 'prop-types';

export default class ImageFlex extends PureComponent {
    static propTypes = {
        src: PropTypes.string.isRequired,
        style: PropTypes.object,
        className: PropTypes.string,
        mode: PropTypes.oneOf([
            // 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
            'scaleToFill',
            // 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
            'aspectFit',
            // 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
            'aspectFill',
            // 宽度不变，高度自动变化，保持原图宽高比不变
            'widthFix',
            // 不缩放图片，只显示图片的顶部区域
            'top',
            // 不缩放图片，只显示图片的底部区域
            'bottom',
            // 不缩放图片，只显示图片的中间区域
            'center',
            // 不缩放图片，只显示图片的左边区域
            'left',
            // 不缩放图片，只显示图片的右边区域
            'right',
            // 不缩放图片，只显示图片的左上边区域
            'topLeft',
            // 不缩放图片，只显示图片的右上边区域
            'topRight',
            // 不缩放图片，只显示图片的左下边区域
            'bottomLeft',
            // 不缩放图片，只显示图片的右下边区域
            'bottomRight'
        ])
    }

    constructor() {
        super()
        this.state = {
            styles: {
                width: '100%'
            }
        }
        this.$containerWidth = ''
        this.$containerHeight = ''
        this.$itemWidth = ''
        this.$itemHeight = ''
        this.placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAABG0lEQVR4nO3TsRHAIBDAsJD9d34W4NxCIU3gxmtm5gOO/tsB8DKDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIBINAMAgEg0AwCASDQDAIhA1ktATExILbkwAAAABJRU5ErkJggg=='
    }

    componentDidMount() {
        this.$containerWidth = this.refs.imageRef.clientWidth
        this.$containerHeight = this.refs.imageRef.clientHeight
        this.resetStyle({ src: this.props.src })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.resetStyle({ src: nextProps.src })
        }
    }

    resetStyle({ src }) {
        if (!src) {
            return
        }
        this.setState({ src })
        const tmpImage = new Image()
        tmpImage.onload = () => {
            this.$itemWidth = tmpImage.width
            this.$itemHeight = tmpImage.height
            this.calculateStyle()
        }
        tmpImage.src = src + '?_=' + new Date().getTime()
    }

    calculateStyle() {
        const { mode } = this.props
        if (mode) {
            const method = 'calculateStyleWith' + mode.slice(0, 1).toUpperCase() + mode.slice(1)
            const styles = this[method].apply(this)
            this.setState({ styles, src: this.props.src })
        }
    }

    calculateStyleWithAspectFit() {
        let style = {}
        if (this.getItemWidthHeightRate() < this.getContainerWidthHeightRate()) {
            style.width = this.getItemWantedWidth()
            style.height = this.$containerHeight
            style.marginLeft = '-' + (style.width - this.$containerWidth)/2 + 'px'
        } else {
            style.width = this.$containerWidth
            style.height = this.getItemWantedHeight()
            style.marginTop = '-' + (style.height - this.$containerHeight)/2 + 'px'
        }
        return style
    }

    getItemWidthHeightRate() {
        return this.$itemWidth/this.$itemHeight
    }

    getContainerWidthHeightRate() {
        return this.$containerWidth/this.$containerHeight
    }

    getItemWantedWidth() {
        return this.$itemWidth*(this.$containerHeight/this.$itemHeight)
    }

    getItemWantedHeight() {
        return this.$itemHeight*(this.$containerWidth/this.$itemWidth)
    }

    render() {
        const { mode, className } = this.props
        const { src, styles } = this.state
        return (
            <img ref='imageRef' className={className} style={styles} src={src}/>
        )
    }
}
