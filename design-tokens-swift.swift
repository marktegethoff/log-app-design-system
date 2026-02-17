// ============================================================
// Log• Design Tokens — Swift / SwiftUI
// Source: AUTHORITATIVE_COLOR_SPECIFICATION.md
// ============================================================

import SwiftUI

// MARK: - Color Extension

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r, g, b: UInt64
        (r, g, b) = ((int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: 1
        )
    }
}

// MARK: - Colors

struct LogColors {
    // Paper Tones — 12-step warm-neutral scale
    static let paper00 = Color(hex: "FAFAF8")
    static let paper05 = Color(hex: "F4F1EC")
    static let paper10 = Color(hex: "ECE8E1")
    static let paper15 = Color(hex: "E0DAD1")
    static let paper20 = Color(hex: "D9D4CB")
    static let paper30 = Color(hex: "B8B1A6")
    static let paper40 = Color(hex: "928A7E")
    static let paper50 = Color(hex: "6E665B")
    static let paper60 = Color(hex: "514A40")
    static let paper70 = Color(hex: "3A342C")
    static let paper80 = Color(hex: "26211B")
    static let paper90 = Color(hex: "171310")
    static let paper95 = Color(hex: "0D0B09")

    // Signal Colors — Intent Classification (constant across light/dark)
    static let signalThought   = Color(hex: "6B7B8D")
    static let signalAction    = Color(hex: "C4652A")
    static let signalDecision  = Color(hex: "8B6E4E")
    static let signalReference = Color(hex: "5B7A6B")
    static let signalUnknown   = Color(hex: "928A7E")

    // Accent Colors
    static let amber          = Color(hex: "C4652A")
    static let archiveAccent  = Color(hex: "5B5168")

    // MARK: Semantic Roles

    static func textPrimary(_ scheme: ColorScheme) -> Color {
        scheme == .dark ? paper05 : paper80
    }

    static func textSecondary(_ scheme: ColorScheme) -> Color {
        scheme == .dark ? paper20 : paper60
    }

    static func textTertiary(_ scheme: ColorScheme) -> Color {
        scheme == .dark ? paper50 : paper40
    }

    static func backgroundPrimary(_ scheme: ColorScheme) -> Color {
        scheme == .dark ? paper95 : paper05
    }

    static func backgroundSecondary(_ scheme: ColorScheme) -> Color {
        scheme == .dark ? paper90 : paper00
    }

    static func border(_ scheme: ColorScheme) -> Color {
        scheme == .dark ? paper80 : paper10
    }

    static func divider(_ scheme: ColorScheme) -> Color {
        scheme == .dark ? paper80 : paper20
    }

    // Signal color lookup by intent type
    static func signal(_ type: IntentType) -> Color {
        switch type {
        case .thought:   return signalThought
        case .action:    return signalAction
        case .decision:  return signalDecision
        case .reference: return signalReference
        case .unknown:   return signalUnknown
        }
    }
}

enum IntentType: String, CaseIterable {
    case thought, action, decision, reference, unknown
}

// MARK: - Typography

struct LogTypography {
    // Mechanism — Space Mono (controls, labels, timestamps, compose placeholder)
    static func mechanism(size: CGFloat, weight: Font.Weight = .regular) -> Font {
        .custom("SpaceMono-Regular", size: size).weight(weight)
    }

    // Tape — IBM Plex Sans (user's words, body copy, annotations)
    static func tape(size: CGFloat, weight: Font.Weight = .regular) -> Font {
        .custom("IBMPlexSans", size: size).weight(weight)
    }

    // Dynamic Type scale
    enum Size {
        static let monoBaseline: CGFloat = 11   // 8.25pt
        static let monoLabel:    CGFloat = 13   // 9.75pt
        static let entryText:    CGFloat = 15   // 11.25pt
        static let body:         CGFloat = 16   // 12pt
        static let h4:           CGFloat = 18   // 13.5pt
        static let h3:           CGFloat = 24   // 18pt
        static let hero:         CGFloat = 28   // 21pt
        static let h2:           CGFloat = 32   // 24pt
        static let h1:           CGFloat = 40   // 30pt
    }

    // Tracking
    enum Tracking {
        static let tight:   CGFloat = -0.035
        static let slight:  CGFloat = -0.01
        static let normal:  CGFloat = 0
        static let wide:    CGFloat = 0.06
    }
}

// MARK: - Spacing

struct LogSpacing {
    static let xs:   CGFloat = 4
    static let sm:   CGFloat = 8
    static let md:   CGFloat = 16
    static let lg:   CGFloat = 24
    static let xl:   CGFloat = 32
    static let xxl:  CGFloat = 48
    static let xxxl: CGFloat = 64
    static let huge: CGFloat = 96
    static let max:  CGFloat = 128
}

// MARK: - Motion

struct LogMotion {
    // Mechanical easing: cubic-bezier(0.2, 0.8, 0.3, 1.0)
    static let mechanical = Animation.timingCurve(0.2, 0.8, 0.3, 1.0, duration: 0.35)
    static let shutter    = Animation.timingCurve(0.2, 0.8, 0.3, 1.0, duration: 0.15)

    // Duration constants
    enum Duration {
        static let shutterPress:   Double = 0.15
        static let entryAppear:    Double = 0.35
        static let timelineSettle: Double = 0.25
        static let commitCycle:    Double = 0.75
        static let pageLoad:       Double = 0.30
        static let darkMode:       Double = 0.30
        static let modal:          Double = 0.40
        static let buttonHover:    Double = 0.15
    }
}
